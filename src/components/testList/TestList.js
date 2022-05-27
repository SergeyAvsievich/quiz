import {$} from '@core/dom'
import {QuizStateComponent} from '@core/QuizStateComponent'
import {fetchQuizes} from '../../storage/actions/action'
import {Navbar} from '../navbar/Navbar'

export class TestList extends QuizStateComponent {
    constructor($root, options, store) {
        super($root, {
            name: 'TestList',
            listeners: ['click'],
            ...options
        })

        this.$root = $root
        this.components = options.components || []
        this.store = store

        this.getQuizes()
    }

    prepare() {}

    get template() {
        return this.createTemplaeteFormAuth()
    }

    createTemplaeteFormAuth() {
        const $navbar = $.create('div')
        const $body = $.create('div')

        $body.html(`
            <h1>TestList</h1>
            ${this.renderTestList()}
        `)

        this.$root.append($navbar)
        this.$root.append($body)

        return this.$root
    }

    getRoot() {
        return this.template
    }

    init() {
        // this.subscriber.subscribeComponents(this.components)
        super.init()
        this.components.forEach(component => component.init())
    }

    getQuizes() {
        this.$dispatch(fetchQuizes())
    }

    renderTestList() {
        const quizes = this.store.getState().quizes
        return Object.values(quizes).map(el => {
            return `<p>${el.name}</p>`
        }).join(' ')
    }

    renderNavbar() {
        return new Navbar().toHTML()
    }

    destroy(){
        // this.subscriber.unSubscribeFromStore()
        this.components.forEach(component => component.destroy())
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.data.type === 'success') {
            // this.registerHandler()
        } else if ($target.data.type === 'secondary') {
            // this.loginHandler()
        }
    }

    renderLinks() {}
}