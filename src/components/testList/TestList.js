import {$} from '@core/dom'
import {QuizStateComponent} from '@core/QuizStateComponent'
// import {Loader} from '../ui/loader/Loader'
// import {Navbar} from '../navbar/Navbar'

export class TestList extends QuizStateComponent {
    static className = 'test-list__list'
    constructor($root, options) {
        super($root, {
            name: 'TestList',
            listeners: [],
            ...options
        })

        this.$root = $root
        this.store = options.store
        // this.loader = new Loader().toHTML()
    }

    prepare() {
        this.initState({
            loading: this.store.getState().loading
        })
    }

    get template() {
        // this.$root.append(this.loader)
        return this.toHTML()
    }

    toHTML() {
        // console.log('call toHTML TestList')
        const $template = $.create('div')
        $template.html(`
                <h1>Список тестов</h1>
                <ul>
                    ${this.renderTestList()}
                </ul>
        `)

        return this.$root.append($template)
    }

    getRoot() {
        return this.template
    }

    init() {
        super.init()
    }

    storeChanged(changes) {
        // console.log('Test changes', changes)
    }

    renderTestList() {
        const quizes = this.store.getState().quizes
        return Object.values(quizes).map(el => {
            // return `<a href="/#quiz/${el.id}">${el.name}</a>`
            return `<li><a href="/#quiz/${el.id}">${el.name}</a></li>`
        }).join(' ')
    }

    // onClick(event) {
    //     const $target = $(event.target)
    //     if ($target.data.type === 'success') {
    //         // this.registerHandler()
    //     } else if ($target.data.type === 'secondary') {
    //         // this.loginHandler()
    //     }
    // }

    destroy() {
        super.destroy()
    }
}