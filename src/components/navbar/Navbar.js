import {QuizStateComponent} from "@core/QuizStateComponent";
import {logout} from "@/storage/actions/auth";
import {$} from "@core/dom"
import {
    createTemplateNavbar,
} from "./navbar.template";

export class Navbar extends QuizStateComponent {
    static className = 'quiz__navbar'

    constructor($root, options) {
        super($root, {
            name: 'Form',
            listeners: ['click'],
            ...options
        })

        this.$root = $root
        this.store = options.store
    }

    toHTML(){
        const token = this.store.getState().token
        return createTemplateNavbar(token)
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.data.type === 'logout') {
            this.logoutHandler()
        }
    }

    logoutHandler() {
        this.$dispatch(logout())
    }

    init() {
        super.init()
    }

    destroy(){
        super.destroy()
    }
}