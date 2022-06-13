import {$} from "@core/dom"
import {QuizStateComponent} from '@core/QuizStateComponent'
import {fetchQuizes} from '../../storage/actions/quiz'
import {TestList} from "../testList/TestList"
import {Loader} from "../ui/loader/Loader"
import {Navbar} from "../navbar/Navbar"
import {resetQuiz} from "../../storage/actions/create"

export class TestListContainer extends QuizStateComponent {
    static className = 'test-list'
    constructor($root, options){
        super($root, {
            name: 'TestListContainer',
            listeners: ['click'],
            subscribe: ['loading'],
            ...options
        })

        this.Components = [Navbar, Loader]
        this.components = []
        this.store = options.store
        this.params = options.params
        this.getQuizes()
    }

    get template() {
        return this.createTemplaeteTestList()
    }

    getQuizes() {
        return new Promise((r) => {
            if (this.store.getState().quiz.length) {
                this.$dispatch(resetQuiz())
            }
            this.$dispatch(fetchQuizes())
            r()
        })
    }

    createTemplaeteTestList() {
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

    getRoot() {
        return this.template
    }

    storeChanged(changes) {
        this.Components = this.Components.filter(Component => {
            return Component !== Loader
        })

        this.components = this.components.filter(component => {
            return !(component instanceof Loader)
        })

        this.$root.clear()
        this.Components.push(TestList)
        this.getRoot()
        this.components.forEach(component => component.init())
    }

    init() {
        this.components.forEach(component => component.init())
    }

    destroy(){
        this.components.forEach(component => component.destroy())
    }
}