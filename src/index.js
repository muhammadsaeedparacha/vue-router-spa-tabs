import CT from './vueChromeTabs'
window.Draggabilly = require('draggabilly')
window.ChromeTabs = new CT()
exports.tabs = function (store, router, options) {
  var moduleName = (options || {}).moduleName || 'tabs'
  // var chromeTabs = new ChromeTabs()
  store.registerModule(moduleName, {
    // namespaced: true,
    state: {tabsList: {}, updating: ''},
    mutations: {
      'tabCreate': function (state, to) {
        state.updating = to.name
        Vue.set(state.tabsList, to.name, to.meta.tab)
      },
      'tabDelete' : function (state, tabIndex) {
        Vue.delete(state.tabsList,tabIndex)
      },
      'tabUpdated': function (state){
        state.updating = ''
      }
    },
    actions: {
      'tabCreate': function ({state,commit, dispatch}, to) {
        commit('tabCreate', to)
        dispatch('tabUpdate')
      },
      'tabUpdate': function ({state, commit, dispatch}, count = 1){
        if(state.updating == '' || count == 10)
          return
        if (!document.querySelector('.chrome-tabs').querySelector('#' + state.updating))
        {
          setTimeout(() => {
            dispatch('tabUpdate', count + 1)
          }, 100)
          return
        }
        ChromeTabs.tabAdded(state.updating)
        commit('tabUpdated')
      },
      'tabDelete': function ({state, commit, dispatch}, tabIndex) {
        var currentTab = ChromeTabs.tabDeleted(tabIndex)
        commit('tabDelete', tabIndex)
        router.push(currentTab)
      },
      'tabsInit': function ({state, dispatch}, payload){
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
        dispatch('tabUpdate')
      },
    }
  })
  router.afterEach(function (to, from) {
    const tab = to.meta.tab || false
    if (tab){
      store.dispatch('tabCreate', to)
    }
  })
}
