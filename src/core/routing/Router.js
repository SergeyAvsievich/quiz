import {$} from '@core/dom'
import {ActiveRout} from './ActiveRouter'

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

    init(){
        window.addEventListener('hashchange', this.changeRouteHandler)
        this.changeRouteHandler()
    }

    changeRouteHandler(){
        if (this.page) {
            this.page.destroy()
        }

        Object.keys(this.routes).forEach(route => {
            const activeRoute = ActiveRout.params.join('/')

            if (activeRoute.includes(route)) {
                const Page = this.routes[route]
                this.page = new Page(ActiveRout.params, this.store)
                this.$root.clear()
                this.$root.append(this.page.getRoot())
                this.page.afterRender()
            }
        })
    }

    destroy(){
        window.removeEventListener('hashchange', this.changeRouteHandler)
    }
}