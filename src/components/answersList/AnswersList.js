import {renderAnswersList, renderFinishQuiz} from "./answerList.template"
import {
    isFinishedQuestion,
    isRightAnswer,
    shouldAnswer,
    shouldRetry,
    shouldReturn
} from "./answerList.functions"
import {
    fetchQuizById,
    finishedQuiz, nextQuestion, quizRetry
} from "../../storage/actions/action"
// import {db, getQuiz} from "../../firebase/firebase"
import {QuizStateComponent} from "../../core/QuizStateComponent"
import {$} from "../../core/dom"
// import axios from "../../axios/axios-quiz"

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

        this.params = options.params
        this.quiz = {}
        // this.getQuiz()
    }

    prepare() {}

    get template() {
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
        console.log('init')
        this.getQuiz()
        setTimeout(() => {
            this.quiz = this.store.getState().quiz
            const quiz = this.quiz
            console.log('quiz: ', quiz)
            renderAnswersList(
                quiz,
                this.store.getState().activeQuestion
            )
        }, 2000)
    }

    getQuiz() {
        const quizId = this.params[1]
        console.log('params: ', quizId)
        this.$dispatch(fetchQuizById(quizId))
    }

    selectAnswer(event) {
        const $target = $(event.target)
        const quiz = this.quiz
        const quizId = $target.data.answer
        const activeQuestion = this.store.getState().activeQuestion

        if (isRightAnswer(quizId, quiz, activeQuestion)) {
            $target.addClass('success')
            this.$dispatch(finishedQuiz({rightAnswer: true}))
        } else {
            $target.addClass('error')
            this.$dispatch(finishedQuiz({rightAnswer: false}))
        }

        setTimeout(() => {
            this.$dispatch(nextQuestion())
            const activeQuestion = this.store.getState().activeQuestion
            const answerState = this.store.getState().answerState

            if (isFinishedQuestion(quiz, activeQuestion)) {
                renderAnswersList(quiz, activeQuestion)
            } else {
                renderFinishQuiz(quiz, answerState)
            }
        }, 1000)
    }

    retryHendler() {
        this.$dispatch(quizRetry())

        const quiz = this.quiz
        const activeQuestion = this.store.getState().activeQuestion

        renderAnswersList(quiz, activeQuestion)
    }

    onClick(event) {
        if (shouldAnswer(event)) {
            this.selectAnswer(event)
        }

        if (shouldRetry(event)) {
            this.retryHendler()
        }

        if (shouldReturn(event)) {
            this.$dispatch(quizRetry())
        }
    }

    destroy() {
        super.destroy()
    }
}