import {initialState} from "../initialState"
import {
    AUTH_LOGOUT,
    AUTH_SUCCESS,
    FINISH_QUIZ,
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY
} from "../types"

export function rootReducer(state = initialState, action){
    switch (action.type) {
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
        case AUTH_SUCCESS:
            return {
                ...state, token: action.token
            }
        case AUTH_LOGOUT:
            return {
                ...state, token: null
            }
        default:
            return state
    }
}