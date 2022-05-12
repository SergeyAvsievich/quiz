import {storage} from "../core/utils"

const defaultState = {
    quizes: [],
    activeQuestion: 1,
    isFinished: false,
    answerState: [],
    token: null,
}

export const initialState = storage('quiz-state')
    ? storage('quiz-state')
    : defaultState