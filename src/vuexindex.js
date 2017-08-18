import Vue from 'vue'
exports.tabs = function (store, router, options) {
  var moduleName = (options || {}).moduleName || 'tabs'

  store.registerModule(moduleName, {
    namespaced: true,
    state: [],
    mutations: {
      'tabCreate': function (state, tabName) {
        state.push(tabName)
      },
      'tabDelete' : function (state, tabName) {
        if(state.indexOf(tabName) != -1){
          state = state.filter(function(tab){
            return tab != tabName
          })
        }
      }
    },
    actions: {
      'routeChanged': function ({state,commit}, tabName) {
        if(state.indexOf(tabName) == -1){
          commit('tabCreate', tabName)
        }
      }
    }
  })

  router.beforeEach((to, from, next) => {
    const tab = to.meta.tab || false
    if (tab)
      store.dispatch(moduleName + '/routeChanged', to.meta.tab)
    return next(fail)
    else {
      if (!this.check(to.meta.permission))
        return next(fail)
      next()
    }
  })

  var isTimeTraveling = false
  var currentPath

  // sync router on store change
  store.watch(
    function (state) { return state[moduleName] },
    function (route) {
      if (route.fullPath === currentPath) {
        return
      }
      isTimeTraveling = true
      var methodToUse = currentPath == null
      ? 'replace'
      : 'push'
      currentPath = route.fullPath
      router[methodToUse](route)
    },
    { sync: true }
    )

  // sync store on router navigation
  router.afterEach(function (to, from) {
    if (isTimeTraveling) {
      isTimeTraveling = false
      return
    }
    currentPath = to.fullPath
    store.commit(moduleName + '/ROUTE_CHANGED', { to: to, from: from })
  })
}

function cloneRoute (to, from) {
  var clone = {
    name: to.name,
    path: to.path,
    hash: to.hash,
    query: to.query,
    params: to.params,
    fullPath: to.fullPath,
    meta: to.meta
  }
  if (from) {
    clone.from = cloneRoute(from)
  }
  return Object.freeze(clone)
}

