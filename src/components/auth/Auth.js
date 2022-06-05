import {$} from '@core/dom'
import {Button} from '../ui/button/Button'
import {Input} from '../ui/input/Input'
import {QuizStateComponent} from '@core/QuizStateComponent'
import is from 'is_js'
import {auth} from '@/storage/actions/auth'
import {debounce} from '@core/utils'

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

        console.log('store auth: ', this.store)
    }

    prepare() {
        this.onInput = debounce(this.onInput, 300)

        this.initState({
            isFormValid: false,
            formControls: {
                email: {
                    value: '',
                    type: 'email',
                    label: 'Введите email',
                    errorMessage: 'Введите корректный email',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        email: true
                    },
                },
                password: {
                    value: '',
                    type: 'password',
                    label: 'Введите пароль',
                    errorMessage: 'Введите корректный пароль',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        minLength: 6
                    },
                },
            }
        })
    }

    get template() {
        return this.createTemplaeteFormAuth()
    }

    createTemplaeteFormAuth() {
        const $input = $.create('div')
        const $button = $.create('button', 'button')

        this.inputs = this.renderInputs($input)

        const $formHeader = $.create('div', 'form__header')
        $formHeader.html(`
            <div class="form__header">
                <h1>Форма авторизации</h1>
            </div>
        `)

        const $formBody = $.create('div', 'form__body')
        $formBody.html(`
            ${this.inputs.map(input => {
                return input.toHTML()
            }).join('')}
        `)

        const $formFoter = $.create('div', 'form__footer')
        $formFoter.html(`
            <div class="form__footer">
                ${this.renderButtons($button)}
            </div>   
            `
        )

        // пробтгаемся по компонентам, создаем для них div
        // this.components = this.components.map(Component => {
        //     const $el = $.create('div', Component.className)
        //     const component = new Component($el, componentOptions)
        //     $el.html(component.toHTML())
        //     $root.append($el)
        //     return component
        // })

        this.$root.append($formHeader)
        this.$root.append($formBody)
        this.$root.append($formFoter)

        return this.$root
    }

    getRoot() {
        return this.template
    }

    init() {
        // this.subscriber.subscribeComponents(this.components)
        super.init()
        this.inputs.forEach(input => input.init())
        this.components.forEach(component => component.init())
    }

    destroy(){
        // this.subscriber.unSubscribeFromStore()
        this.components.forEach(component => component.destroy())
    }

    onInput(event) {
        console.log('event: ', event.target.value)
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
                console.log('admin: ', admin)
                window.location.href = '/#'
            } else {
                window.location.href = '/#error'
            }
        }, 1000)
    }

    registerHandler() {
        const email = this.state.formControls.email.value
        const password = this.state.formControls.password.value

        this.$dispatch(auth(email, password, false))
    }

    renderInputs($input) {
        return Object.keys(this.state.formControls)
        .map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return new Input($input, {
                    key: controlName + index,
                    name: controlName,
                    type: control.type,
                    value: control.value,
                    valid: control.valid,
                    touched: control.touched,
                    label: control.label,
                    shouldValidate: !!control.validation,
                    errorMessage: control.errorMessage
                }
            )
        })
    }

    renderButtons($button) {
        return [
            new Button($button, {
                type: 'secondary',
                text: 'Вход',
                disabled: !this.state.isFormValid
            }),
            new Button($button, {
                type: 'success',
                text: 'Регистрация',
                disabled: !this.state.isFormValid
            }),
        ].map(button => button.toHTML()).join('')
    }

    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = is.email(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }

    onChangeHandler(event) {
        const formControls = this.state.formControls
        const controlName = event.target.dataset.input
        const control = {...formControls[controlName]}

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({formControls, isFormValid})

        const input = document.querySelector(`[data-input='${controlName}']`)
        input.setAttribute('type', 'text')
        input.focus()
        input.selectionStart = input.value.length
        input.setAttribute('type', `${controlName}`)
    }
}