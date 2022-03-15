import {$} from "../../core/dom"

// конструктор класса принимает селектор, собственно куда в дом
// добавляем quiz

export class Quiz {
    constructor(selector, options) {
        this.$el = $(selector)
        this.store = options.store
        this.components = options.components || []
    }

    getRoot() {
        // создаем главный div с классом quiz
        const $root = $.create('div', 'quiz')
        // $root.classList.add('quiz')

        const componentOptions = {
            store: this.store
        }

        // пробтгаемся по компонентам, создаем для них div
        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            const component = new Component($el, componentOptions)
            $el.html(component.toHTML())
            $root.append($el)
            return component
        })

        return $root
    }

    render() {
        this.$el.append(this.getRoot())

        this.components.forEach(component => component.init())
    }
}