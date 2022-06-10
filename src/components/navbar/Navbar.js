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
        // switch ($target.data.type) {
        //     case 'logout':
        //         return this.logoutHandler()
        //     case 'create':
        //     case 'test-list':
        //     case 'admission':
        //         this.$dispatch(resetQuiz())
        // }

        if ($target.data.type === 'logout') {
            this.logoutHandler()
        }

        if ($target.data.type === 'create') {
            this.$dispatch(resetQuiz())
        }

        if ($target.data.type === 'test-list') {
            this.$dispatch(resetQuiz())
        }

        if ($target.data.type === 'admission') {
            this.$dispatch(resetQuiz())
        }
    }

    logoutHandler() {
        this.$dispatch(logout())
        this.$dispatch(resetQuiz())
    }

    init() {
        super.init()
    }

    destroy(){
        super.destroy()
    }
}