import {Page} from "@core/Page";
import {Auth} from "../components/auth/Auth";
import {$} from "@core/dom"

export class AuthPage extends Page {
    constructor(params, store) {
        super(params)
        this.store = store
    }

    getRoot() {
        const $container = $.create('div', 'auth')

        const $root = $.create('div', 'auth__form')
        this.auth = new Auth($root, {
            components: [],
        }, this.store)

        $container.append(this.auth.getRoot())

        return $container
    }

    afterRender() {
        this.auth.init()
    }

    destroy() {
        this.quiz.destroy()
    }
}