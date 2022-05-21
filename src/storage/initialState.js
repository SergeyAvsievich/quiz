import {storage} from "../core/utils"

const defaultState = {
    quizes: [],
    loading: false,
    error: null,
    results: {},
    isFinished: false,
    activeQuestion: 1,
    answerState: [],
    quiz: null,
    token: null,
}

export const initialState = storage('quiz-state')
    ? storage('quiz-state')
    : defaultState