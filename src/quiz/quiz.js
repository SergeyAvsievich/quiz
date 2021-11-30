const quiz = {
    currentQuestion: 1,
    questions: [
        {
            questionTitle: 'Как дела?',
            rightAnswer: 1,
            answers: [
                {id: 1, title: 'хорошо'},
                {id: 2, title: 'нормально'},
                {id: 3, title: 'не плохо'},
                {id: 4, title: 'плохо'},
            ]
        },
        {
            questionTitle: 'Как погода?',
            rightAnswer: 2,
            answers: [
                {id: 1, title: 'солнечно'},
                {id: 2, title: 'прохладно'},
                {id: 3, title: 'идет дождь'},
                {id: 4, title: 'пасмурно'},
            ]
        }, 
    ],
    answers: []
}

// const getListenerAnswers = () => {
    
// }

//рэндэрит список ответов
const renderAnswersList = () => {
    return quiz.questions[quiz.currentQuestion - 1].answers.map(answer => `
        <li data-answer="${answer.id}">${answer.title}</li>
    `).join('')  
}

export const renderQuiz = () => {
    const form = document.querySelector('.quiz-wrapper')
    
    form.innerHTML = `
        <div>
            <div class="d-flex justify-content-between">
                <h3>${quiz.questions[quiz.currentQuestion - 1].questionTitle}</h3>
                <small>Вопрос ${quiz.currentQuestion} из ${quiz.questions.length}</small>
            </div>
            <ul>
                ${renderAnswersList()}
            </ul>
        </div>
    `

    document.querySelectorAll('[data-answer]')
    .forEach(item => item.addEventListener('click', (event => {
        // console.log('event:' , event)
        clickHandler(event.target)
    })
    ))
}

renderQuiz()

const renderFinishQuiz = () => {

    const form = document.querySelector('.quiz-wrapper')

    form.innerHTML = `
        <div>
            <h2>Ваши результаты: </h2>
            <hr>
            <span>Привильно ${quiz.answers.reduce((acc, i) => acc + +i.rightAnswer, 0)} из ${quiz.questions.length}</span>
            <ol>
                ${quiz.answers.map((answer, index) => {
                    return `<li>
                                ${quiz.questions[index].questionTitle} 
                                ${answer.rightAnswer 
                                    ? "<i class='fas fa-check'></i>"
                                    : "<i class='fas fa-times'></i>"
                                }
                            </li>`
                }).join('')}
            </ol>
            <button class="btn btn-primary me-2">Пройти тест заново</button>
            <button class="btn btn-success">Перейти в список тестов</button>
        </div>
        
    `
}

const clickHandler = (el) => {
    const rightAnswerId = quiz.questions[quiz.currentQuestion - 1].rightAnswer
    const id = +el.dataset.answer

    if(id === rightAnswerId){
        el.className = 'success'
        quiz.answers.push({rightAnswer: true})
    }else{
        el.className = 'error'
        quiz.answers.push({rightAnswer: false})
    }

    if(quiz.questions.length > quiz.currentQuestion){
        quiz.currentQuestion++
        setTimeout(renderQuiz, 800)
    }else{
        setTimeout(renderFinishQuiz, 800)
    }
}