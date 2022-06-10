import {renderAnswersList, renderFinishQuiz} from "./answerList.template"
import {
    isFinishedQuestion,
    isRightAnswer,
    shouldAnswer,
    shouldRetry,
    shouldReturn
} from "./answerList.functions"
import {
    finishedQuiz, nextQuestion, quizRetry
} from "../../storage/actions/action"
import {QuizComponent} from "../../core/QuizComponent"
import {$} from "../../core/dom"
import {resetQuiz} from "../../storage/actions/create"

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

export class AnswersList extends QuizComponent {
    static className = 'quiz__answers-list'

    constructor($root, options) {
        super($root, {
            name: 'AnswersList',
            listeners: ['click'],
            subscribe: [],
            ...options
        })

        this.params = options.params
        this.$root = $root
        this.quiz = {}
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
        setTimeout(() => {
            this.quiz = this.store.getState().quiz
            const quiz = this.quiz
            console.log('quiz: ', quiz)
            try {
                renderAnswersList(
                    quiz,
                    this.store.getState().activeQuestion
                )
            } catch (e) {
                console.log('Error: ', e)
            }
        }, 0)

        return this.template
    }

    init() {
        console.log('answer list init')
        super.init()
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
            this.$dispatch(resetQuiz())
            this.$dispatch(quizRetry())
        }
    }

    destroy() {
        super.destroy()
    }
}