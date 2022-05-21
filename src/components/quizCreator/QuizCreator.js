// import {$} from '@core/dom'
// import {Button} from '../ui/button/Button'
// import {Input} from '../ui/input/Input'
import {QuizStateComponent} from '@core/QuizStateComponent'
// import is from 'is_js'
// import axios from 'axios'
import {debounce} from '../../core/utils'

export class QuizCreator extends QuizStateComponent {
    constructor($root, options) {
        super($root, {
            name: 'Form',
            listeners: ['input', 'click'],
            ...options
        })

        this.$root = $root
        this.components = options.components || []
        // this.store = options.store
    }

    prepare() {
        // будет ли данные получать через debounce
        this.onInput = debounce(this.onInput, 300)

        this.initState({})
    }

    get template() {
        return this.createTemplaeteFormQuizCreator()
    }

    createTemplaeteFormQuizCreator() {
        return `
            <div class="quiz-creator">
                <form class="quiz-creator__form">
                <div class="form__header">
                    <h1>Создание теста</h1>
                </div>
                <hr/>
                <div class="form__body">
                    <div>
                    <label for="enter-question">Введите вопрос</label>
                    <input type="text" id="enter-question">
                    </div>
                    <div>
                    <label for="variant1">Вариант 1</label>
                    <input type="text" id="variant1">
                    </div>
        
                    <div>
                    <label for="variant2">Вариант 2</label>
                    <input type="text" id="variant2">
                    </div>
                    <div>
                    <label for="variant3">Вариант 3</label>
                    <input type="text" id="variant3">
                    </div>
                    <div>
                    <label for="variant4">Вариант 4</label>
                    <input type="text" id="variant4">
                    </div>
                    
                </div>
                <div>
                    <span>Выберите правильный ответ</span>
                    <select>
                    <option>Пункт 1</option>
                    <option>Пункт 2</option>
                    <option>Пункт 3</option>
                    <option>Пункт 4</option>
                    </select>
                </div>
                <hr/>
                <div class="form__footer">
                    <button class="btn btn-primary me-1">
                        Добавить вопрос
                    </button>
                    <button class="btn btn-success">Создать тест</button>
                </div>
                </form>
            </div>
        `
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

    onInput(event) { }

    onClick(event) { }

    renderInputs($input) { }

    renderButtons($button) { }

    onChangeHandler(event) { }
}