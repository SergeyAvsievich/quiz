import {$} from "../../core/dom"
import {StoreSubscriber} from "../../core/StoreSubscriber"

// конструктор класса принимает селектор, собственно куда в дом
// добавляем quiz

export class Quiz {
    constructor(selector, options) {
        this.$el = $(selector)
        this.components = options.components || []
        this.store = options.store
        this.subscriber = new StoreSubscriber(this.store)
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

        this.subscriber.subscribeComponents(this.components)
        this.components.forEach(component => component.init())
    }

    destroy(){
        this.subscriber.unSubscribeFromStore()
        this.components.forEach(component => component.destroy())
    }
}