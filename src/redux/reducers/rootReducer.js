import {initialState} from "../initialState"
import {FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_RETRY} from "../types"

console.log('reduce: ', initialState)

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
        default:
            return state
    }
}