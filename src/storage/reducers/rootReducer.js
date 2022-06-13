import {initialState} from "../initialState"
import {
    AUTH_LOGOUT,
    AUTH_SUCCESS,
    CREATE_QUIZ_QUESTION,
    FETCH_QUIEZES_ERROR,
    FETCH_QUIEZES_START,
    FETCH_QUIEZES_SUCCESS,
    FETCH_QUIZ_SUCCESS,
    FINISH_QUIZ,
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY,
    QUIZ_SET_STATE,
    RESET_CREATE_QUIZ
} from "../types"

export function rootReducer(state = initialState, action){
    switch (action.type) {
        // testList
        case FETCH_QUIEZES_START:
            return {
                ...state,
                loading: true
            }
        case FETCH_QUIEZES_SUCCESS:
            return {
                ...state,
                loading: false,
                quizes: action.quizes
            }
        case FETCH_QUIEZES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        // quiz
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state,
                loading: false,
                quiz: action.quiz
            }
        case QUIZ_SET_STATE:
            return {
                ...state,
                answerstate: action.answerState,
                results: action.results
            }
        case QUIZ_NEXT_QUESTION:
            return {
                ...state,
                activeQuestion: state.activeQuestion + 1
            }
        case QUIZ_RETRY:
            return {
                ...state,
                quizes: [],
                activeQuestion: 1,
                isFinished: false,
                answerState: []
            }
        case FINISH_QUIZ:
            return {
                ...state,
                answerState: [...state.answerState, action.answer],
                isFinished: true
            }

        // auth
        case AUTH_SUCCESS:
            return {
                ...state, token: action.token
            }
        case AUTH_LOGOUT:
            return {
                ...state, token: null
            }

        // create
        case CREATE_QUIZ_QUESTION:
            return {
                ...state,
                quiz: [...state.quiz, action.quizItem]
            }
        case RESET_CREATE_QUIZ: {
            return {
                ...state,
                quiz: [],
            }
        }
        default:
            return state
    }
}