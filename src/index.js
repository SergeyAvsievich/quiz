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
import 'mdb-ui-kit/js/mdb.min.js'
import './styles/style.scss'

const store = createStore(rootReducer, applyMiddleware(thunk))

const defaultRoute = ''
const id = ActiveRoute.params.slice(1)

const routes = {
    [defaultRoute]: TestListPage,
    [`quiz/${id}`]: QuizPage,
    admin: AuthPage,
    creator: QuizCreatorPage,
}

store.subscribe(state => {
    if (process.env.NODE_ENV === 'development') {
       window['redux'] = state
    }
    storage('quiz-state', state)
})

new Router('#app', routes, store)