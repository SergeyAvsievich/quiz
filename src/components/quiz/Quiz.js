import {$} from "@core/dom"
import {QuizStateComponent} from "../../core/QuizStateComponent"
import {preventDefault} from "../../core/utils"
import {fetchQuizById} from "../../storage/actions/quiz"
import {AnswersList} from "../answersList/AnswersList"
import {Navbar} from "../navbar/Navbar"
import {Loader} from "../ui/loader/Loader"

export class Quiz extends QuizStateComponent {
    constructor($root, options) {
        super($root, {
            name: 'Quiz',
            listeners: ['click'],
            subscribe: ['quiz'],
            ...options
        })

        this.components = options.components || []
        this.store = options.store
        this.params = options.params
        this.Components = [Navbar, Loader]
        this.components = []

        this.getQuiz()
    }

    getQuiz() {
        const quizId = this.params[1]
        this.$dispatch(fetchQuizById(quizId))
    }

    getRoot() {
        const componentOptions = {
            store: this.store,
            params: this.params
        }

        this.components = this.Components.map(Component => {
            const $el = $.create('div', Component.className)
            const component = new Component($el, componentOptions)
            $el.html(component.toHTML())
            this.$root.append($el)
            return component
        })

        return this.$root
    }

    init() {
        if (process.env.NODE_ENV === 'production') {
            document.addEventListener('contextmenu', preventDefault)
        }
        this.components.forEach(component => component.init())
    }

    storeChanged(changes) {
        if (!changes) {
            return
        }

        if (changes.quiz.length) {
            this.Components = this.Components.filter(Component => {
                return Component !== Loader
            })

            this.components = this.components.filter(component => {
                return !(component instanceof Loader)
            })

            this.$root.clear()
            this.Components.push(AnswersList)
            this.getRoot()
            this.components.forEach(component => component.init())
        }
    }

    destroy(){
        this.components.forEach(component => component.destroy())
        document.removeEventListener('contextmenu', preventDefault)
    }
}