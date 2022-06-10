import {$} from '@core/dom'
import {QuizStateComponent} from '@core/QuizStateComponent'

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
    }

    prepare() {}

    get template() {
        return this.toHTML()
    }

    toHTML() {
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

    renderTestList() {
        const quizes = this.store.getState().quizes
        return Object.values(quizes).map(el => {
            return `<li><a href="/#quiz/${el.id}">${el.name}</a></li>`
        }).join(' ')
    }

    destroy() {
        super.destroy()
    }
}