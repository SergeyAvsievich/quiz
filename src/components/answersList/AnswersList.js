import {renderAnswersList, renderFinishQuiz} from "./answerList.template"
import {
    isFinishedQuestion,
    isRightAnswer,
    shouldAnswer,
    shouldRetry
} from "./answerList.functions"
import {
    finishedQuiz, nextQuestion, quizRetry
} from "../../redux/actions/action"
// import {db, getQuiz} from "../../firebase/firebase"
import {QuizStateComponent} from "../../core/QuizStateComponent"
import {$} from "../../core/dom"
import axios from "axios"

// const quizes = {
//     // currentQuestion: 1,
//     questions: [
//         {
//             questionTitle: 'Как дела?',
//             rightAnswer: 1,
//             answers: [
//                 {id: 1, title: 'хорошо'},
//                 {id: 2, title: 'нормально'},
//                 {id: 3, title: 'не плохо'},
//                 {id: 4, title: 'плохо'},
//             ]
//         },
//         {
//             questionTitle: 'Как погода?',
//             rightAnswer: 2,
//             answers: [
//                 {id: 1, title: 'солнечно'},
//                 {id: 2, title: 'прохладно'},
//                 {id: 3, title: 'идет дождь'},
//                 {id: 4, title: 'пасмурно'},
//             ]
//         },
//     ],
// }

export class AnswersList extends QuizStateComponent {
    static className = 'quiz__answers-list'

    constructor($root, options) {
        super($root, {
            name: 'AnswersList',
            listeners: ['click'],
            // subscribe: ['answerState', 'activeQuestion'], подписки
            // на изменения состояния с другими компонентами
            ...options
        })

        this.quiz = {}
    }

    prepare() {
        // если нужно
        // const initialState = {}
        this.initState({})
    }

    get template() {
        // сформировать шпблон в йункцию и передать this.state
        // Например, createTemplate(this.state)
        // Использование setState
        // this.setState({key: value})
        return `
        <div class="container d-flex justify-content-center mt-5">
            <div class="quiz-wrapper"></div>
        </div>    
        `
    }

    toHTML() {
        return this.template
    }

    init() {
        super.init()

        // наверное правильно асинхронный метод вызывать здесь
        // ненравится, присвоение this.quiz = item[0]
        // пока так, но нужно переработать
        this.getQuizDate().then(quiz => {
            renderAnswersList(
                quiz.questions,
                this.store.getState().activeQuestion
            )
        })

        // console.log('quiz questions: ', this.quizes)
        // renderAnswersList(
        //     this.getQuizDate().questions,
        //     // this.quiz.questions,
        //     this.store.getState().activeQuestion
        // )
    }

    async getQuizDate() {
        try {
            const response = await axios.get('https://quiz-js-5d6a6-default-rtdb.firebaseio.com/questions.json')
            this.quiz.questions = response.data
            console.log('data: ', response.data)
            console.log('data: ', this.quiz)
            return this.quiz
        } catch (e) {
            console.log('error: ', e)
        }
    }

    selectAnswer(event) {
        const quiz = this.quiz
        const questions = this.quiz.questions
        const $target = $(event.target)
        const state = this.store.getState()

        if (isRightAnswer(
            $target.data.answer,
            quiz,
            state.activeQuestion
        )
        ) {
            $target.addClass('success')
            this.$dispatch(finishedQuiz({rightAnswer: true}))
        } else {
            $target.addClass('error')
            this.$dispatch(finishedQuiz({rightAnswer: false}))
        }

        setTimeout(() => {
            this.$dispatch(nextQuestion())
            if (isFinishedQuestion(
                questions,
                this.store.getState().activeQuestion)
            ) {
                renderAnswersList(
                    questions,
                    this.store.getState().activeQuestion
                )
            } else {
                renderFinishQuiz(questions, this.store.getState().answerState)
            }
        }, 1000)
    }

    retryHendler() {
        const quiz = this.quiz
        const questions = quiz.questions

        this.$dispatch(quizRetry())
        renderAnswersList(questions, this.store.getState().activeQuestion)
    }

    storeChanged({activeQuestion, answerState}) { }

    onClick(event) {
        if (shouldAnswer(event)) {
            this.selectAnswer(event)
        }

        if (shouldRetry(event)) {
            this.retryHendler()
        }
    }
}