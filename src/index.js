import {createStore} from './core/redux/createStore'
import {Router} from './core/routing/Router'
import {storage} from './core/utils'
import {AuthPage} from './pages/AuthPage'
import {QuizCreatorPage} from './pages/quizCreatorPage'
import {QuizPage} from './pages/QuizPage'
import {rootReducer} from './storage/reducers/rootReducer'
import {applyMiddleware} from '@core/redux/applyMiddleware'
import {thunk} from '@core/redux/thunk'
import {TestListPage} from './pages/TestListPage'
import {ActiveRoute} from './core/routing/ActiveRouter'
import './styles/style.scss'

// const routes = [
//     {path: '', element: AuthPage},
//     {path: '', element: QuizPage},
// ]

// проблема в передаче store, создаетьсч в компоненте Quiz

const store = createStore(rootReducer, applyMiddleware(thunk))

store.subscribe(state => {
    console.log('App State: ', state)

    storage('quiz-state', state)
})

const defaultRout = ''
const id = ActiveRoute.params.slice(1)

new Router('#app', {
    [defaultRout]: TestListPage,
    [`quiz/${id}`]: QuizPage,
    auth: AuthPage,
    creator: QuizCreatorPage,
}, store)