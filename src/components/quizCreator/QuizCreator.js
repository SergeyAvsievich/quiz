import {$} from '@core/dom'
import {QuizStateComponent} from '@core/QuizStateComponent'
import {debounce} from '@/core/utils'
import {createformControls, validate, validateForm} from './quizCreator.form'
import {createQuizQuestion, finishedCreateQuiz} from '@/storage/actions/create'
import {navigate} from '../../core/utils'
import {initialState} from './quizCreator.initialState'
import {Navbar} from "../navbar/Navbar";
import {
    createInputs,
    createTemplateFooter,
    createTemplateBody,
    createTemplateHeader,
    createSelect
} from './quizCreator.template'

export class QuizCreator extends QuizStateComponent {
    constructor($root, options, store) {
        super($root, {
            name: 'quiz-creator',
            listeners: ['input', 'click', 'change'],
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
        return this.createTemplaeteFormQuizCreator()
    }

    createTemplaeteFormQuizCreator() {
        this.inputs = createInputs(this.state)
        this.select = createSelect(this.state)

        const $container = $.create('div', 'quiz-creator__form')
        const $form = $.create('div', 'form')

        this.$root.append(this.createNavbar())
        $form.append(createTemplateHeader())
        $form.append(createTemplateBody(this.inputs, this.select))
        $form.append(createTemplateFooter(this.state, this.store))
        $container.append($form)
        this.$root.append($container)

        return this.$root
    }

    createNavbar() {
        const $el = $.create('div', Navbar.className)
        this.navbar = new Navbar($el, {
            store: this.store
        })
        $el.html(this.navbar.toHTML())
        return $el
    }

    getRoot() {
        return this.template
    }

    init() {
        super.init()
        this.components = [this.navbar, ...this.inputs]
        this.components.forEach(component => component.init())
    }

    destroy() {
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
        } else if ($target.data.type === 'success') {
            this.addQueizHandler()
        }
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

    addQuestionHandler() {
        const {
            question,
            option1,
            option2,
            option3,
            option4
        } = this.state.formControls

        const questionItem = {
            question: question.value,
            id: this.store.getState().quiz.length,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},
            ]
        }

        this.$dispatch(createQuizQuestion(questionItem))

        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createformControls()
        })
    }

    addQueizHandler() {
        this.$dispatch(finishedCreateQuiz())
        setTimeout(() => navigate(''), 1000)
    }

    onChange(event) {
        const $target = $(event.target)
        const dataSelect = $target.data.select
        if (dataSelect) {
            this.setState({
                rightAnswerId: +event.target.value
            })
            this.$root.findOne(`[data-select]`).value = +event.target.value
        }
    }
}