import {QuizComponent} from '@core/QuizComponent'

function isInvalid({valid, touched, shouldValidate}) {
    console.log(!valid && shouldValidate && touched)
}

export class Input extends QuizComponent {
    constructor($root, options) {
        super($root, {
            name: 'Input',
            listeners: ['input'],
            ...options
        })

        this.label = options.label
        this.inputType = options.inputType
        this.errorMessage = options.errorMessage

        this.init()
    }

    get template() {
        const htmlFor = `${this.inputType}-${Math.random()}`

        // if (isInvalid()) {}

        return `
            <div class="input">
                <label for="${htmlFor}">${this.label}</label>
                <input
                    type=${this.inputType}
                    id=${htmlFor}
                />
                ${isInvalid('valid')
                ? ` <span>
                            ${this.errorMessage || 'Введите верное значение'}
                        </span>`
                : ''
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
        console.log('Input: ', event)
    }
}