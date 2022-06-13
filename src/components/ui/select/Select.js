import {QuizComponent} from '@core/QuizComponent'

export class Select extends QuizComponent {
    constructor($root, options) {
        super($root, {
            name: 'Select',
            listeners: [],
            ...options
        })

        this.label = options.label
        this.value = options.value
        this.optionsParams = options.optionsParams
    }

    prepare() {}

    get template() {
        const htmlfor = `${Date.now()}-${Math.random()}`
        return `
            <div class="sselect">
                <label for="${htmlfor}">${this.label}</label>
                <select 
                    id="${htmlfor}"
                    value="${this.value}"
                    data-select="${htmlfor}"
                >
                ${this.createTemplateOptions()}
                </select>
            </div>
        `
    }

    createTemplateOptions() {
        return this.optionsParams.map((option, index) => {
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
}