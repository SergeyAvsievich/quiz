import {$} from '@core/dom'
import {Button} from '../ui/button/Button'
import {Input} from '../ui/input/Input'
import {Select} from '../ui/select/Select'
import {QuizStateComponent} from '@core/QuizStateComponent'
import {debounce} from '../../core/utils'
import {createformControls, validate, validateForm} from './quizCreator.form'
// import is from 'is_js'
// import axios from 'axios'

export class QuizCreator extends QuizStateComponent {
    constructor($root, options, store) {
        super($root, {
            name: 'Form',
            listeners: ['input', 'click', 'change'],
            ...options
        })

        this.$root = $root
        this.components = options.components || []
        this.store = store
    }

    prepare() {
        // будет ли данные получать через debounce
        this.onInput = debounce(this.onInput, 300)

        this.initState({
            quiz: [],
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createformControls()
        })
    }

    get template() {
        return this.createTemplaeteFormQuizCreator()
    }

    createTemplaeteFormQuizCreator() {
        const $input = $.create('div')
        const $button = $.create('button')
        const $select = $.create('select')

        this.inputs = this.renderInputs($input)

        const $formHeader = $.create('div', 'form__header')
        $formHeader.html(`
            <div class="form__header">
                <h1>Создание теста</h1>
            </div>
        `)

        const $formBody = $.create('div', 'form__body')
        $formBody.html(`
            ${this.inputs.map(input => {
            return input.toHTML()
        }).join('')}
            ${this.renderSelect($select)}
        `)

        const $formFooter = $.create('div', 'form__footer')
        $formFooter.html(`
            <div class="form__footer">
                ${this.renderButtons($button)}
            </div>
            `
        )

        this.$root.append($formHeader)
        this.$root.append($formBody)
        this.$root.append($formFooter)

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

    destroy() {
        // this.subscriber.unSubscribeFromStore()
        this.components.forEach(component => component.destroy())
    }

    onInput(event) {
        const $target = $(event.target)
        if ($target.data.input) {
            this.inputHandler(event)
        }
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.data.type === 'primary') {
            this.addQuestionHandler(event)
            console.log('add question: ', this.state.quiz)
        } else if ($target.data.type === 'success') {
            console.log('state success: ', this.state)
        }
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
                type: 'primary',
                text: ' Добавить вопрос',
                disabled: !this.state.isFormValid
            }),
            new Button($button, {
                type: 'success',
                text: 'Создать тест',
                disabled: this.state.quiz.length === 0
            }),
        ].map(button => button.toHTML()).join('')
    }

    renderSelect($select) {
        const options = [
            {text: 1, value: 1},
            {text: 2, value: 2},
            {text: 3, value: 3},
            {text: 4, value: 4}
        ]

        const select = new Select($select, {
            label: 'Выбирите праведьный ответ',
            value: this.state.rightAnswerId,
            optionsParams: options,
            // onChange: this.selectChangeHandler
        }).toHTML()
        return select
    }

    inputHandler(event) {
        const formControls = {...this.state.formControls}
        const controlName = event.target.dataset.input
        const control = {...formControls[controlName]}

        control.touched = true
        control.value = event.target.value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })

        const input = document.querySelector(`[data-input='${controlName}']`)
        input.focus()
        input.selectionStart = input.value.length
    }

    submitHandler(event) {
        event.preventDefoult()
    }

    addQuestionHandler(event) {
        const quiz = this.state.quiz.concat()
        const index = quiz.length + 1

        const {
            question,
            option1,
            option2,
            option3,
            option4
        } = this.state.formControls

        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},
            ]
        }

        quiz.push(questionItem)

        this.setState({
            quiz,
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createformControls()
        })
    }

    onChange(event) {
        const $target = $(event.target)

        console.log('store: ', this.store)

        if ($target.data.select) {
            this.setState({
                rightAnswerId: +event.target.value
            })
        }
    }
}