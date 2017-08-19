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
        console.log("Debug: Tab Create Mutation")
        
        state.updating = to.name
        Vue.set(state.tabsList, to.name, to.meta.tab)
        
      },
      'tabDelete' : function (state, tabIndex) {
        console.log("Debug: Tab Delete Mutation")
        Vue.delete(state.tabsList,tabIndex)
      },
      'tabUpdated': function (state){
        console.log("Debug: Tab Update Mutation")
        state.updating = ''
      }
    },
    actions: {
      'tabCreate': function ({state, commit, dispatch}, to) {
        console.log("Debug: Tab Create Action")
        if(!state[to.name]){
          commit('tabCreate', to)
          dispatch('tabUpdate')
        }
      },
      'tabUpdate': function ({state, commit, dispatch}, count = 1){
        console.log("Debug: Tab Update Action")
        if(state.updating == '' || count == 5){
          ChromeTabs.refreshTabs()
          return
        }
        if (!document.querySelector('.chrome-tabs #' + state.updating))
        {
          setTimeout(() => {
            dispatch('tabUpdate', count + 1)
          }, i * 100)
          return
        }
        ChromeTabs.tabAdded(state.updating)
        commit('tabUpdated')
      },
      'tabDelete': function ({state, commit, dispatch}, tabIndex) {
        console.log("Debug: tabDelete Action")
        var currentTab = ChromeTabs.tabDeleted(tabIndex)
        commit('tabDelete', tabIndex)
        if(currentTab != tabIndex){
          router.push(currentTab)
        }
      },
      'tabsInit': function ({state, dispatch}, payload){
        console.log("Debug: Tabs Init")
        var el = document.querySelector('.chrome-tabs')
        if(payload && !ChromeTabs.el){
          ChromeTabs.init(el, payload)
        } else if (!ChromeTabs.el) {
          ChromeTabs.init(el, {
            tabOverlapDistance: 14,
            minWidth: 45,
            maxWidth: 243
          })
        }
        // dispatch('tabUpdate')
      },
    }
  })
  router.afterEach(function (to, from) {
    console.log("Debug: Router After Each")
    const tab = to.meta.tab || false
    if (tab){
      store.dispatch('tabCreate', to)
    }
  })
}
