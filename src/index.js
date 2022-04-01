import {Router} from './core/routing/Router'
import {AuthPage} from './pages/AuthPage'
import {QuizPage} from './pages/QuizPage'
import './styles/style.scss'

// const routes = [
//     {path: '', element: AuthPage},
//     {path: '', element: QuizPage},
// ]

new Router('#app', {
    auth: AuthPage,
    quiz: QuizPage
})