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
import {TestListPage} from './pages/TestListPage'
import {ActiveRout} from './core/routing/ActiveRouter'

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

const id = ActiveRout.params.slice(1)

new Router('#app', {
    auth: AuthPage,
    [`quiz/${id}`]: QuizPage,
    creator: QuizCreatorPage,
    list: TestListPage
}, store)