import {createStore} from './core/redux/createStore'
import {Router} from './core/routing/Router'
import {storage} from './core/utils'
import {AuthPage} from './pages/AuthPage'
import {QuizPage} from './pages/QuizPage'
import {rootReducer} from './storage/reducers/rootReducer'
import './styles/style.scss'

// const routes = [
//     {path: '', element: AuthPage},
//     {path: '', element: QuizPage},
// ]

// проблема в передаче store, создаетьсч в компоненте Quiz

const store = createStore(rootReducer)

console.log('str: ', store)

store.subscribe(state => {
    console.log('App State: ', state)
    storage('quiz-state', state)
})

new Router('#app', {
    auth: AuthPage,
    quiz: QuizPage
}, store)