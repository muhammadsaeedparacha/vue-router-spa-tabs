import ChromeTabs from './vueChromeTabs'
window.Draggabilly = require('draggabilly')
window.ChromeTabs = new ChromeTabs()
exports.tabs = function (store, router, options) {
  var moduleName = (options || {}).moduleName || 'tabs'
  // var chromeTabs = new ChromeTabs()
  store.registerModule(moduleName, {
    // namespaced: true,
    state: {tabsList: {}},
    mutations: {
      'tabCreate': function (state, to) {
        Vue.set(state.tabsList, to.name, to.meta.tab)
      },
      'tabDelete' : function (state, tabIndex) {
        Vue.delete(state.tabsList,tabIndex)
      },
    },
    actions: {
      'routeChanged': function ({state,commit, dispatch}, to) {
        commit('tabCreate', to)
        ChromeTabs.tabAdded(to.name)
      },
      'tabDelete': function ({state, commit, dispatch}, tabIndex) {
        commit('tabDelete', tabIndex)
        router.push(ChromeTabs.tabDeleted(tabIndex))
      },
      'tabsInit': function ({state}, payload){
        var el = document.querySelector('.chrome-tabs')
        if(payload){
          ChromeTabs.init(el, payload)
        } else {
          ChromeTabs.init(el, {
            tabOverlapDistance: 14,
            minWidth: 45,
            maxWidth: 243
          })
        }
      },
    }
  })
  router.afterEach(function (to, from) {
    const tab = to.meta.tab || false
    if (tab){
      store.dispatch('routeChanged', to)
    }
  })
}
