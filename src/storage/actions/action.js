import axios from '@/axios/axios-quiz'
import {
    FETCH_QUIEZES_ERROR,
    FETCH_QUIEZES_START,
    FETCH_QUIEZES_SUCCESS,
    FETCH_QUIZ_SUCCESS,
    FINISH_QUIZ,
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY,
    QUIZ_SET_STATE
} from "../types";

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('/quizes.json')

            const quizes = []

            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест №${index + 1}`
                })
            })

            dispatch(fetchQuizesSuccess(quizes))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIEZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIEZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIEZES_ERROR,
        error: e
    }
}

export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart())

        try {
            const response = await axios.get(`/quizes/${quizId}.json`)
            const quiz = response.data
            console.log('action: ', quiz)
            dispatch(fetchQuizSuccess(quiz))
        } catch (e) {
            console.log(e)
        }
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results
    }
}

export function nextQuestion(){
    return {
        type: QUIZ_NEXT_QUESTION,
    }
}

export function quizRetry(){
    return {
        type: QUIZ_RETRY,
    }
}

export function finishedQuiz(answer){
    return {
        type: FINISH_QUIZ,
        answer
    }
}