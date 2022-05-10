import {QuizComponent} from '@core/QuizComponent'

export class Input extends QuizComponent {
    constructor($root, options) {
        super($root, {
            name: 'Input',
            listeners: ['input'],
            ...options
        })

        this.type = options.type
        this.label = options.label
        this.errorMessage = options.errorMessage
        this.value = options.value
        this.touched = options.touched
        this.minLength = options.minLength
        this.key = options.key
        this.name = options.name
        this.valid = options.valid
    }

    prepare() {}

    get template() {
        return `
            <div class="input">
                <label for="${this.key}">${this.label}</label>
                <input
                    id="${this.key}"
                    type="${this.type}"
                    value="${this.value}"
                    data-input="${this.name}"
                />
                ${(this.valid || !this.touched)
                    ? ''
                    : `<span>${this.errorMessage}</span>`
            }
            </div>
        `
    }

    toHTML() {
        return this.template
    }

    init() {
        super.init()
    }

    onInput(event) {
        this.value = event.target.value
    }
}