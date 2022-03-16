import {
    isFinishedQuestion,
    isRightAnswer,
    renderAnswersList,
    renderFinishQuiz
} from "./answerList.template"
import {finishedQuiz, nextQuestion, quizRetry} from "../../redux/actions/action"
import {db, getQuiz} from "../../firebase/firebase"
import {QuizStateComponent} from "../../core/QuizStateComponent"

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

// console.log('qz', quizes)


export class AnswersList extends QuizStateComponent {
    static className = 'quiz__answers-list'

    constructor($root, options) {
        super($root, {
            name: 'AnswersList',
            listeners: ['click'],
            subscribe: ['answerState', 'activeQuestion'],
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
            <div class="quiz-wrapper">
            </div>
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

        getQuiz(db).then(item => {
            this.quiz = item[0]
        }).then(() => {
            renderAnswersList(
                this.quiz.questions,
                this.store.getState().activeQuestion
            )
        })
    }

    storeChanged({activeQuestion, answerState}){

    }

    onClick(event) {
        if (event.target.dataset.answer) {
            if (isRightAnswer(
                event.target.dataset.answer,
                this.quiz,
                this.store.getState().activeQuestion)
            ) {
                event.target.className = 'success'
                this.$dispatch(finishedQuiz({rightAnswer: true}))
            } else {
                event.target.className = 'error'
                this.$dispatch(finishedQuiz({rightAnswer: false}))
            }
            setTimeout(() => {
                this.$dispatch(nextQuestion())
                if (isFinishedQuestion(
                    this.quiz.questions,
                    this.store.getState().activeQuestion)
                ) {
                    renderAnswersList(
                        this.quiz.questions,
                        this.store.getState().activeQuestion
                    )
                } else {
                    renderFinishQuiz(
                        this.quiz.questions,
                        this.store.getState().answerState
                    )
                }
            }, 1000)
        } else if (event.target.dataset.retry) {
            this.$dispatch(quizRetry())
            renderAnswersList(
                this.quiz.questions, this.store.getState().activeQuestion
            )
        }
    }
}