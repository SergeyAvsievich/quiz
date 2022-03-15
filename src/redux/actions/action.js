import {FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_RETRY} from "../types";

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