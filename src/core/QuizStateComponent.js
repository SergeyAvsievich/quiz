import {QuizComponent} from '@core/QuizComponent'

export class QuizStateComponent extends QuizComponent {
    constructor(...args) {
        super(...args)
    }

    initState(initialState = {}) {
        this.state = {...initialState}
        if (typeof this.state !== 'object') {
            throw new Error('InitialState must be an object')
        }
        this.prevState = this.state
    }

    get template() {
        return JSON.stringify(this.state, null, 2)
    }

    setState(newState) {
        if (JSON.stringify(newState) !== JSON.stringify(this.prevState)) {
            this.prevState = newState
            this.state = {...this.state, ...newState}
        }

        this.$root.innerHTML = ''
        this.$root.innerHTML = this.template.innerHTML
    }
}