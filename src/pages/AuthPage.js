import {Page} from "@core/Page";
import {Auth} from "../components/auth/Auth";
// import {$} from "@core/dom"

export class AuthPage extends Page {
    constructor(params) {
        super(params)
    }

    getRoot() {
        this.auth = new Auth({
            components: [],
        })

        return this.auth.getRoot()
    }

    afterRender() {
        this.auth.init()
    }

    destroy() {
        this.quiz.destroy()
    }
}