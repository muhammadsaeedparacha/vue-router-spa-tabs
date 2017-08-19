import ChromeTabs from './vueChromeTabs'
window.Draggabilly = require('draggabilly')
exports.tabs = function (store, router, options) {
  var moduleName = (options || {}).moduleName || 'tabs'
  // var chromeTabs = new ChromeTabs()
  store.registerModule(moduleName, {
    // namespaced: true,
    state: {chromeTabs: new ChromeTabs(), tabsList: {}},
    mutations: {
      'tabCreate': function (state, to) {
        Vue.set(state.tabsList, to.name, to.meta.tab)
      },
      'tabDelete' : function (state, tabIndex) {
        Vue.delete(state.tabsList,tabIndex)
      },
    },
    actions: {
      'routeChanged': function ({commit, dispatch}, to) {
        commit('tabCreate', to)
        this.chromeTabs.tabAdded(to.name)
      },
      'tabDelete': function ({commit, dispatch}, tabIndex) {
        commit('tabDelete', tabIndex)
        window.router.push(this.chromeTabs.tabDeleted(tabIndex))
      },
      'tabsInit': function ({}, payload){
        var el = document.querySelector('.chrome-tabs')
        if(payload){
          this.chromeTabs.init(el, payload)
        } else {
          this.chromeTabs.init(el, {
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
