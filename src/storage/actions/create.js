import axios from "@/axios/axios-quiz";
import {
    CREATE_QUIZ_QUESTION,
    RESET_CREATE_QUIZ
} from "../types";

export function createQuizQuestion(quizItem) {
    return {
        type: CREATE_QUIZ_QUESTION,
        quizItem
    }
}

export function resetQuiz() {
    return {
        type: RESET_CREATE_QUIZ
    }
}

export function finishedCreateQuiz() {
    return async (dispatch, getState) => {
        await axios.post('/quizes.json', getState().quiz)
        dispatch(resetQuiz())
    }
}