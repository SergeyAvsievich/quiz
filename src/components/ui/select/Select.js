import {QuizComponent} from '@core/QuizComponent'

export class Input extends QuizComponent {
    constructor($root, options) {
        super($root, {
            name: 'Input',
            listeners: ['change'],
            ...options
        })
    }

    prepare() {}

    get template() {
        const htmlfor = `${this.label}-${Math.random()}`
        return `
            <div class="sselect">
                <label for="${htmlfor}"></label>
                <select 
                    id="${htmlfor}"
                    value="${this.value}"
                >

                </select>
            </div>
        `
    }

    createTemplateoptions() {
        return this.options.map((option, inedex) => {
            return `
                <option
                    value="${option.value}"
                >
                    ${option.text}
                </option>
            `
        })
    }

    toHTML() {
        return this.template
    }

    init() {
        super.init()
    }

    onChange() {}
}