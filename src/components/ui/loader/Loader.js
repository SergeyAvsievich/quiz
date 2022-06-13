import {QuizComponent} from "@core/QuizComponent"

export class Loader extends QuizComponent {
    static className = 'Loader'

    constructor($root, options) {
        super($root, {
            name: 'Loader',
            listeners: [],
            ...options
        })
    }

    get template() {
        return this.toHTML()
    }

    toHTML() {
        return `
            <div class="loader-container">
                <div class="ldr"></div>
            </div>
        `
    }

    getRoot() {
        return this.template
    }

    init() {
        super.init()
    }

    destroy() {
        super.destroy()
    }
}