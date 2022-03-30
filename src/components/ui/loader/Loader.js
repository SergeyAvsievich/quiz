import {QuizComponent} from "@core/QuizComponent";

export class Loader extends QuizComponent{
    static className = 'quiz__loader'

    constructor($root, options) {
        super($root, {
            listeners: [],
            // subscribe: ['answerState', 'activeQuestion'], подписки
            // на изменения состояния с другими компонентами
            ...options
        })
    }
    toHTML(){
        return `
            <div class="loader-container">
                <div class="loader"></div>
            </div>
        `
    }
}