// ! question - не из store
export function isRightAnswer(answer, {questions}, activeQuestion){
    return +answer === questions[activeQuestion - 1].rightAnswer
}

export function isFinishedQuestion(questions, activeQuestion){
    return activeQuestion === questions.length
}

export function shouldAnswer(event) {
    return event.target.dataset.answer
}

export function shouldRetry(event) {
    return event.target.dataset.retry
}