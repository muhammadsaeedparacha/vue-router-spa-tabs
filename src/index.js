'use strict'

import store from 'vuex'
class Vue-Router-Tabs {

    set router(router) {
        router.beforeEach((to, from, next) => {
            const tab = to.meta.tab || false
            if (tab)
                return next(fail)
            else {
                if (!this.check(to.meta.permission))
                    return next(fail)
                next()
            }
        })
    }
    init(router) {
        this.router = router
        this.store = store
    }

}

let tabs = new Vue-Router-Tabs()

Tabs.install = function (Vue, {router, store}) {

    acl.init(router, store)

    Vue.prototype.$tabs = function (tab = null) {
        if (tab != null) {
            if (Array.isArray(tab))
                tabs.tabs = tabs.tabs + tab
            else
                tabs.tabs = tabs.tabs + [tab]
        }
        else
            return tabs.tabs
    }

    Vue.prototype.$access = function (newAccess = null) {
        if (newAccess != null) {
            if (Array.isArray(newAccess))
                acl.permissions = newAccess
            else if (newAccess.indexOf('&') !== -1)
                acl.permissions = newAccess.split('&')
            else
                acl.permissions = [newAccess]
        }
        else
            return acl.permissions
    }
}

export default Tabs