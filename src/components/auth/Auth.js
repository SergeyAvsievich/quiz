import {$} from '@core/dom'
import {Button} from '../ui/button/Button'
import {Input} from '../ui/input/Input'

export class Auth {
    constructor(options) {
        this.components = options.components || []
        this.store = options.store
    }

    getRoot() {
        const $root = $.create('div', 'auth')
        const $el = $.create('div')

        const btn = new Button($el, {
            type: 'primary',
            disabled: true
        })

        const input = new Input($el, {
            inputType: 'text',
            label: 'Введите логин',
            errorMessage: 'Неправильный логин'
        })

        // eslint-disable-next-line no-constant-condition
        // if (true) {
        //     input.classList.add('invalid')
        // }

        $root.html(`
            <form class="auth__form">
                <div class="form__header">
                    <h1>Форма авторизации</h1>
                </div>
                <hr/>
                <div class="form__body">
                    <div>
                        <label for="login">Логин</label>
                        <input type="text" id="login">
                    </div>
                    <div>
                        <label for="password">Пароль</label>
                        <input type="password" id="password">
                        ${input.toHTML()}
                    </div>
                </div>
                <hr/>
                <div class="form__footer">
                    <button class="btn btn-success me-1">Вход</button>
                    <button class="btn btn-secondary">Регистрация</button>
                    ${btn.toHTML()}
                </div>
            </form>
        `)

        // пробтгаемся по компонентам, создаем для них div
        // this.components = this.components.map(Component => {
        //     const $el = $.create('div', Component.className)
        //     const component = new Component($el, componentOptions)
        //     $el.html(component.toHTML())
        //     $root.append($el)
        //     return component
        // })

        return $root
    }

    init() {
        // this.subscriber.subscribeComponents(this.components)
        this.components.forEach(component => component.init())
    }

    destroy(){
        // this.subscriber.unSubscribeFromStore()
        this.components.forEach(component => component.destroy())
    }
}