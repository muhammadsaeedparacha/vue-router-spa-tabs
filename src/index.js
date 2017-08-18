import Vue from 'vue'
exports.tabs = function (store, router, options) {
  var moduleName = (options || {}).moduleName || 'tabs'

  store.registerModule(moduleName, {
    namespaced: true,
    state: [],
    mutations: {
      'tabCreate': function (state, to) {
        state[to.meta.tab] = to.path
      },
      'tabDelete' : function (state, tabName) {
        foreach (state as tab => path ) {
          if (tab == tabName) {
            delete state[tab]
            // state.$remove(tab)
          }
        }
      }
    },
    actions: {
      'routeChanged': function ({state,commit}, to) {
        if(!state[to.meta.tab]){
          commit('tabCreate', to)
        },
        'tabDelete': function ({commit}, tabName) {
          commit('tabDelete', tabName)
        }
      }
    }
  })

  router.afterEach((to, from) => {
    const tab = to.meta.tab || false
    if (tab)
      store.dispatch(moduleName + '/routeChanged', to)
  })
}
