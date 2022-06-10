import {$} from '@core/dom'
import {Input} from '../ui/input/Input'
import {Select} from '../ui/select/Select'
import {Button} from '../ui/button/Button'

export function createTemplateHeader() {
    const $formHeader = $.create('div', 'form__header')
    $formHeader.html(`
        <div class="form__header">
            <h1>Создание теста</h1>
        </div>
    `)
    return $formHeader
}

export function createTemplateBody(state, inputs) {
    const $formBody = $.create('div', 'form__body')
    $formBody.html(`
        ${inputs.map(input => {
        return input.toHTML()
    }).join('')}
        ${createSelect(state)}
    `)
    return $formBody
}

function createSelect(state) {
    const $select = $.create('select')
    const options = [
        {text: 1, value: 1},
        {text: 2, value: 2},
        {text: 3, value: 3},
        {text: 4, value: 4}
    ]

    const select = new Select($select, {
        label: 'Выбирите правельный ответ',
        value: state.rightAnswerId,
        optionsParams: options,
        // onChange: this.selectChangeHandler
    }).toHTML()

    return select
}

export function createInputs(state) {
    const $input = $.create('div')

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

export function createTemplateFooter(state, store) {
    const $formFooter = $.create('div', 'form__footer')
    $formFooter.html(`
        <div class="form__footer">
            ${createButtons(state, store)}
        </div>
        `
    )

    return $formFooter
}

export function createButtons(state, store) {
    const $button = $.create('button')
    const btnAddQuestion = new Button($button, {
        type: 'primary',
        text: ' Добавить вопрос',
        disabled: !state.isFormValid
    })
    const btnCreateQuiz = new Button($button, {
        type: 'success',
        text: 'Создать тест',
        disabled: store.getState().quiz.length === 0
    })

    const btnList = [btnAddQuestion, btnCreateQuiz]

    return btnList.map(button => button.toHTML()).join('')
}