import {Page} from "@core/Page";
import {Auth} from "../components/auth/Auth";
import {$} from "@core/dom"

export class AuthPage extends Page {
    constructor(params) {
        super(params)
    }

    getRoot() {
        const $container = $.create('div', 'auth')

        const $root = $.create('div', 'auth__form')
        this.auth = new Auth($root, {
            components: [],
        })

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