import {$} from '@core/dom'

export class CreateQuiz {
    constructor(options) {
        this.components = options.components || []
        this.store = options.store
    }

    getRoot() {
        const $root = $.create('div', 'quiz')

        // пробтгаемся по компонентам, создаем для них div
        // this.components = this.components.map(Component => {
        //     const $el = $.create('div', Component.className)
        //     const component = new Component($el, componentOptions)
        //     $el.html(component.toHTML())
        //     $root.append($el)
        //     return component
        // })

        return $root
    }

    init() {
        // this.subscriber.subscribeComponents(this.components)
        // this.components.forEach(component => component.init())
    }

    destroy(){
        // this.subscriber.unSubscribeFromStore()
        // this.components.forEach(component => component.destroy())
    }
}