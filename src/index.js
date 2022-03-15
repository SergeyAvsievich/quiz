import './styles/style.scss'
// import './quiz/quiz.js'
import {Quiz} from '@/components/quiz/Quiz'
import {Navbar} from '@/components/navbar/Navbar'
import {AnswersList} from '@/components/answersList/AnswersList'
import {createStore} from './core/createStore'
import {rootReducer} from './redux/reducers/rootReducer'
import {storage} from './core/utils'
// import {Loader} from '@/components/ui/loader/Loader'

const store = createStore(rootReducer)

// subscribe лучше здесь сделать
// где мы орпределяем inisialState вызвать storage
// и здесь storage передать в subscribe как ниже
store.subscribe(state => {
    console.log('App State: ', state)
    storage('quiz-state', state)
})

// создаем инстанс класса куиз, который рэндэрит в нужном порядке компоненты
const quiz = new Quiz('#app', {
    components: [Navbar, AnswersList],
    // components: [Navbar, Loader],
    store
})

quiz.render()