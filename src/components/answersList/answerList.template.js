export function renderAnswersList(questions, activeQuestion) {
    // представление отделить
    // желательно разбить эту функцию

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

// думаю, лучше будет вынести создания списка ответов в один компонент
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
                ${finishetQuizList(questions, answers)}
            </ol>
            <button class="btn btn-primary me-2" data-retry="true">
                Пройти тест заново
            </button>
            <button class="btn btn-success">Перейти в список тестов</button>
        </div>
        
    `
}

function finishetQuizList(questions, answers){
    return answers.map((answer, index) => {
        return `
            <li>
                ${questions[index].questionTitle} 
                
                ${answer.rightAnswer
                        ? "<i class='fas fa-check'></i>"
                        : "<i class='fas fa-times'></i>"}
            </li>
        `
    }).join('')
}