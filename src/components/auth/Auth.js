import {$} from '@core/dom'
import {QuizStateComponent} from '@core/QuizStateComponent'
import {auth} from '@/storage/actions/auth'
import {debounce} from '@core/utils'
import {initialState} from './auth.initialState'
import {
    createFormBodyTemplate,
    createFormFooterTemplate,
    createFormHeaderTemplate,
    renderInputs
} from './auth.template'
import {validateControl, validateForm} from './auth.validate'

export class Auth extends QuizStateComponent {
    constructor($root, options, store) {
        super($root, {
            name: 'Form',
            listeners: ['input', 'click'],
            ...options
        })

        this.$root = $root
        this.components = options.components || []
        this.store = store
    }

    prepare() {
        this.onInput = debounce(this.onInput, 300)
        this.initState(initialState)
    }

    get template() {
        return this.createTemplaeteFormAuth()
    }

    createTemplaeteFormAuth() {
        const $input = $.create('div')
        this.inputs = renderInputs($input, this.state)

        this.$root.append(createFormHeaderTemplate())
        this.$root.append(createFormBodyTemplate(this.inputs))
        this.$root.append(createFormFooterTemplate(this.state))

        return this.$root
    }

    getRoot() {
        return this.template
    }

    init() {
        super.init()
        this.inputs.forEach(input => input.init())
        this.components.forEach(component => component.init())
    }

    destroy(){
        this.components.forEach(component => component.destroy())
    }

    onInput(event) {
        this.onChangeHandler(event)
    }

    onClick(event) {
        const $target = $(event.target)

        if ($target.data.type === 'success') {
            this.registerHandler()
        } else if ($target.data.type === 'secondary') {
            this.loginHandler()
        }
    }

    loginHandler() {
        const email = this.state.formControls.email.value
        const password = this.state.formControls.password.value

        this.$dispatch(auth(email, password, true))

        setTimeout(() => {
            const admin = this.store.getState().token
            if (admin) {
                window.location.href = '/#'
            } else {
                throw new Error('Пользоватеь не зарегистрирован')
            }
        }, 1500)
    }

    registerHandler() {
        const email = this.state.formControls.email.value
        const password = this.state.formControls.password.value

        this.$dispatch(auth(email, password, false))

        alert('Пользователь успешно зарегестрирован.')

        const formControls = this.state.formControls

        Object.keys(formControls).map(key => {
            formControls[key].value = ''
        })

        this.setState({formControls})
    }

    onChangeHandler(event) {
        const formControls = this.state.formControls
        const controlName = event.target.dataset.input
        const control = {...formControls[controlName]}

        control.value = event.target.value
        control.touched = true
        control.valid = validateControl(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })

        const input = document.querySelector(`[data-input='${controlName}']`)
        input.setAttribute('type', 'text')
        input.focus()
        input.selectionStart = input.value.length
        input.setAttribute('type', `${controlName}`)
    }
}