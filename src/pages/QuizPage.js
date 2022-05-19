import {Page} from "@core/Page";
import {Quiz} from '@/components/quiz/Quiz'
import {Navbar} from '@/components/navbar/Navbar'
import {AnswersList} from '@/components/answersList/AnswersList'
// import {storage} from '@core/utils'
// import {createStore} from '@core/redux/createStore'
// import {rootReducer} from '@/storage/reducers/rootReducer'

export class QuizPage extends Page {
    constructor(params, store){
        super(params)
        this.params = params
        this.store = store
    }

    getRoot() {
        // создаем инстанс класса куиз, который рэндэрит в
        // нужном порядке компоненты
        this.quiz = new Quiz({
            components: [Navbar, AnswersList],
            store: this.store
        })

        return this.quiz.getRoot()
    }

    afterRender() {
        this.quiz.init()
    }

    destroy() {
        this.quiz.destroy()
    }
}