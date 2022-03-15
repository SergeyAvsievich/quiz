export function renderAnswersList(questions, activeQuestion) {
    // представление отделить

    const form = document.querySelector('.quiz-wrapper')

    form.innerHTML = `
                <div>
                    <div class="d-flex justify-content-between">
                        <h3>
                            ${questions[activeQuestion - 1]
            .questionTitle}
                        </h3>
                        <small>
                            Вопрос 1
                            из ${questions.length}
                        </small>
                    </div>
                    <ul>
                        ${questions[activeQuestion - 1].answers
            .map(answer => `
                                <li data-answer="${answer.id}">
                                    ${answer.title}
                                </li>`)
            .join('')}
                    </ul>
                </div>
    `

    return form
}

// export function nextQuestion(activeQuestion) {
//     activeQuestion++
// }

export function isRightAnswer(answer, {questions}, activeQuestion,){
    if (+answer === questions[activeQuestion - 1].rightAnswer){
        return true
    } else {
        return false
    }
}

export function isFinishedQuestion(questions, activeQuestion){
    if (activeQuestion === questions.length){
        return true
    } else {
        false
    }
}

export const renderFinishQuiz = (questions, answers) => {
    const form = document.querySelector('.quiz-wrapper')

    form.innerHTML = `
        <div>
            <h2>Ваши результаты: </h2>
            <hr>
            <span>
                Привильно 
                ${answers.reduce((acc, i) => acc + +i.rightAnswer, 0)} 
                из ${questions.length}
            </span>
            <ol>
                ${answers.map((answer, index) => {
        return `<li>
                    ${questions[index].questionTitle} 
                    ${answer.rightAnswer
                ? "<i class='fas fa-check'></i>"
                : "<i class='fas fa-times'></i>"
            }
                            </li>`
    }).join('')}
            </ol>
            <button class="btn btn-primary me-2" data-retry="true">
                Пройти тест заново
            </button>
            <button class="btn btn-success">Перейти в список тестов</button>
        </div>
        
    `
}