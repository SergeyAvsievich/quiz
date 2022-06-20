import {QuizStateComponent} from "@core/QuizStateComponent";
import {logout} from "@/storage/actions/auth";
import {$} from "@core/dom"
import {
    createTemplateNavbar,
} from "./navbar.template";
import {resetQuiz} from "../../storage/actions/create";

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
        const findEl = this.$root.findOne('#navbar-collapse')

        switch ($target.data.type) {
            case 'logout':
                return this.logoutHandler()
            case 'test-list':
            case 'create':
            case 'admission':
                this.$dispatch(resetQuiz())
                if (findEl) {
                    findEl.removeClass('in')
                }
        }
    }

    logoutHandler() {
        this.$dispatch(logout())
        this.$dispatch(resetQuiz())
        const findEl = this.$root.findOne('#navbar-collapse')
        if (findEl) {
            findEl.removeClass('in')
        }
    }

    init() {
        super.init()
    }

    destroy(){
        super.destroy()
    }
}