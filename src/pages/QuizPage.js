import {Page} from "@core/Page";
import {Quiz} from '@/components/quiz/Quiz'
import {Navbar} from '@/components/navbar/Navbar'
import {AnswersList} from '@/components/answersList/AnswersList'
import {createStore} from '@core/createStore'
import {rootReducer} from '@/redux/reducers/rootReducer'
import {storage} from '@core/utils'

export class QuizPage extends Page{
    constructor(params){
        super(params)
        this.params = params
    }

    getRoot() {
        const store = createStore(rootReducer)

        // subscribe лучше здесь сделать
        // где мы орпределяем inisialState вызвать storage
        // и здесь storage передать в subscribe как ниже
        store.subscribe(state => {
            console.log('App State: ', state)
            storage('quiz-state', state)
        })

        // создаем инстанс класса куиз, который рэндэрит в
        // нужном порядке компоненты
        this.quiz = new Quiz({
            components: [Navbar, AnswersList],
            store
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