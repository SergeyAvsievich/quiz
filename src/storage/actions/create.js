import {CREATE_QUIZ_QUESTION} from "../types";

export function createQuizQuestion(quizItem) {
    return {
        item: CREATE_QUIZ_QUESTION,
        quizItem
    }
}

// export function finishedCreateQuiz() {

// }