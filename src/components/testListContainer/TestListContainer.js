import {$} from "@core/dom"
import {QuizStateComponent} from '@core/QuizStateComponent'
import {fetchQuizes} from '../../storage/actions/action'
import {TestList} from "../testList/TestList"
import {Loader} from "../ui/loader/Loader"

export class TestListContainer extends QuizStateComponent {
    static className = 'test-list'
    constructor($root, options){
        super($root, {
            name: 'TestListContainer',
            listeners: ['click'],
            subscribe: ['loading'],
            ...options
        })

        this.Components = [Loader]
        this.components = []
        this.store = options.store
        this.params = options.params
        this.getQuizes()
    }

    get template() {
        // this.$root.append(this.loader)
        return this.createTemplaeteTestList()
    }

    getQuizes() {
        return new Promise((r) => {
            this.$dispatch(fetchQuizes())
            r()
        })
    }

    createTemplaeteTestList() {
        const componentOptions = {
            store: this.store,
            params: this.params
        }

        // пробтгаемся по компонентам, создаем для них div
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

    storeChanged() {
        this.Components = this.Components.filter(Component => {
            return Component !== Loader
        })

        this.components = this.components.filter(component => {
            return !(component instanceof Loader)
        })

        this.$root.clear()
        this.Components.push(TestList)
        this.getRoot()
    }

    init() {
        this.components.forEach(component => component.init())
    }

    destroy(){
        this.components.forEach(component => component.destroy())
    }
}