import {$} from '../dom'
import {ActiveRoute} from './ActiveRouter'

export class Router {
    constructor(selector, routes, store) {
        if (!selector) {
            throw new Error('Selector is not defined')
        }

        this.store = store
        this.$root = $(selector)
        this.routes = routes
        this.changeRouteHandler = this.changeRouteHandler.bind(this)
        this.init()
    }

    init() {
        window.addEventListener('hashchange', this.changeRouteHandler)
        this.changeRouteHandler()
    }

    changeRouteHandler() {
        if (this.page) {
            this.page.destroy()
        }

        Object.keys(this.routes).forEach(async route => {
            const activeRoute = ActiveRoute.params.join('/')

            if (activeRoute.includes(route)) {
                const Page = this.routes[route]
                this.page = new Page(ActiveRoute.params, this.store)
                const root = await this.page.getRoot()
                this.$root.clear().append(root)
                this.page.afterRender()
            }
        })
    }

    destroy() {
        window.removeEventListener('hashchange', this.changeRouteHandler)
    }
}