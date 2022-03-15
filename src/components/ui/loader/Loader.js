import {QuizComponent} from "@core/QuizComponent";

export class Loader extends QuizComponent{
    static className = 'quiz__loader'
    toHTML(){
        return `
            <div class="loader-container">
                <div class="loader"></div>
            </div>
        `
    }
}