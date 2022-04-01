import {QuizComponent} from '@core/QuizComponent'

export class Button extends QuizComponent {
    static className = 'btn btn-secondary'

    constructor($root, options) {
        super($root, {
            name: 'Button',
            listeners: ['click'],
            ...options
        })

        this.type = options.type
        this.disabled = options.disabled

        this.init()
    }

    prepare() {}

    get template() {
        return `
            <button 
                class="button ${this.type}"
                disabled="${this.disabled}"    
            >Click Me</button>  
        `
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