import {QuizComponent} from '@core/QuizComponent'

export class Button extends QuizComponent {
    static className = 'btn btn-secondary'

    constructor($root, options) {
        super($root, {
            name: 'Button',
            listeners: ['click'],
            ...options
        })

        this.$root = $root
        this.type = options.type
        this.disabled = options.disabled
        this.text = options.text

        this.init()
    }

    prepare() {}

    get template() {
        this.$root.$el.className = `button ${this.type}`
        this.$root.text(this.text)
        this.$root.attr('data-type', this.type)
        this.$root.$el.disabled = this.disabled
        return this.$root.$el.outerHTML
        // return `
        //     <button
        //         class="button ${this.type}"
        //         ${disabled}
        //     >${this.text}</button>
        // `
    }

    toHTML() {
        return this.template
    }

    init() {
        super.init()
    }

    onClick(event) {
        console.log('Button: ', event)
    }
}