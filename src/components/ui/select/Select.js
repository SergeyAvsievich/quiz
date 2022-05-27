import {QuizComponent} from '@core/QuizComponent'

export class Select extends QuizComponent {
    constructor($root, options) {
        super($root, {
            name: 'Select',
            listeners: [],
            ...options
        })

        this.optionsParams = options.optionsParams
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
                    data-select="${htmlfor}"
                >
                ${this.createTemplateOptions()}
                </select>
            </div>
        `
    }

    createTemplateOptions() {
        console.log('options: ', this.optionsParams)
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