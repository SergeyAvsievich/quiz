import {$} from '@core/dom'
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

    init(){
        window.addEventListener('hashchange', this.changeRouteHandler)
        this.changeRouteHandler()
    }

    changeRouteHandler(){
        if (this.page) {
            this.page.destroy()
        }

        Object.keys(this.routes).forEach(route => {
            const activeRoute = ActiveRoute.params.join('/')

            console.log('route: ', route)
            console.log('activeRoute: ', activeRoute)

            if (activeRoute.includes(route)) {
                const Page = this.routes[route]
                this.page = new Page(ActiveRoute.params, this.store)
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