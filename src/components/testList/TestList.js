import {$} from '@core/dom'
import {QuizStateComponent} from '@core/QuizStateComponent'
import {fetchQuizes} from '../../storage/actions/action'
// import {Loader} from '../ui/loader/Loader'
// import {Navbar} from '../navbar/Navbar'

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
        this.subscriber = this.store.subscribe
        this.getQuizes()
        // this.loader = new Loader().toHTML()
    }

    prepare() {}

    get template() {
        // this.$root.append(this.loader)
        return this.createTemplaeteListTest()
    }

    createTemplaeteListTest() {
        console.log('call createTemplateListTest')
        // this.subscriber(state => {
        //     if (!state.loading) {
        //         this.$root.clear()
        //         // this.createTemplaeteListTest()
        //     }
        // })

        // this.subscriber()()

        const $body = $.create('div', 'test-list')

        $body.html(`
            <div>
                <h1>Список тестов</h1>
                <ul>
                    ${this.renderTestList()}
                </ul>
            </div>
        `)

        this.$root.append(this.renderNavbar())
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
        console.log('call getQuizes')
        return new Promise((r) => {
            this.$dispatch(fetchQuizes())
            r()
        })
    }

    renderTestList() {
        const quizes = this.store.getState().quizes
        return Object.values(quizes).map(el => {
            // return `<a href="/#quiz/${el.id}">${el.name}</a>`
            return `<li><a href="/#quiz/${el.id}">${el.name}</a></li>`
        }).join(' ')
    }

    renderNavbar() {
        const componentOptions = {
            store: this.store,
            params: this.params
        }

        let $el

        // пробтгаемся по компонентам, создаем для них div
        this.components = this.components.map(Component => {
            $el = $.create('div', Component.className)
            const component = new Component($el, componentOptions)
            $el.html(component.toHTML())
            return component
        })

        return $el
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