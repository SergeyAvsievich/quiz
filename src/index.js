import {createStore} from './core/redux/createStore'
import {Router} from './core/routing/Router'
import {storage} from './core/utils'
import {AuthPage} from './pages/AuthPage'
import {QuizCreatorPage} from './pages/quizCreatorPage'
import {QuizPage} from './pages/QuizPage'
import {rootReducer} from './storage/reducers/rootReducer'
import {applyMiddleware} from '@core/redux/applyMiddleware'
import {thunk} from '@core/redux/thunk'
import './styles/style.scss'

// const routes = [
//     {path: '', element: AuthPage},
//     {path: '', element: QuizPage},
// ]

// проблема в передаче store, создаетьсч в компоненте Quiz

const store = createStore(rootReducer, applyMiddleware(thunk))

console.log('str: ', store)

store.subscribe(state => {
    console.log('App State: ', state)
    storage('quiz-state', state)
})

new Router('#app', {
    auth: AuthPage,
    quiz: QuizPage,
    creator: QuizCreatorPage
}, store)