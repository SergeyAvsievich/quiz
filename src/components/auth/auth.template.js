import {$} from "@core/dom"
import {Button} from '../ui/button/Button'
import {Input} from '../ui/input/Input'

export function createFormHeaderTemplate() {
    const $formHeader = $.create('div', 'form__header')

    $formHeader.html(`
        <div class="form__header">
            <h1>Форма авторизации</h1>
        </div>
    `)

    return $formHeader
}

export function createFormBodyTemplate(inputs) {
    const $formBody = $.create('div', 'form__body')
    $formBody.html(`
        ${inputs.map(input => {
            return input.toHTML()
        }).join('')}
    `)
    return $formBody
}

export function renderInputs($input, state) {
    return Object.keys(state.formControls)
    .map((controlName, index) => {
        const control = state.formControls[controlName]
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

export function createFormFooterTemplate(state) {
    const $formFooter = $.create('div', 'form__footer')
    const $button = $.create('button', 'button')

    $formFooter.html(`
        <div class="form__footer">
            ${renderButtons($button, state)}
        </div>   
        `
    )

    return $formFooter
}

export function renderButtons($button, state) {
    const exitButton = new Button($button, {
        type: 'secondary',
        text: 'Вход',
        disabled: !state.isFormValid
    })

    const registerButton = new Button($button, {
        type: 'success',
        text: 'Регистрация',
        disabled: !state.isFormValid
    })

    const buttons = [exitButton, registerButton]

    return buttons.map(button => button.toHTML()).join('')
}