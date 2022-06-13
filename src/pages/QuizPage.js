import {Page} from "@core/Page";
import {Quiz} from '@/components/quiz/Quiz'
import {StoreSubscriber} from "@core/redux/StoreSubscriber"
import {$} from "@core/dom"

export class QuizPage extends Page {
    constructor(params, store){
        super(params)
        this.params = params
        this.store = store
        this.subscriber = new StoreSubscriber(this.store)
    }

    getRoot() {
        const $quiz = $.create('div', 'quiz')
        this.quiz = new Quiz($quiz, {
            store: this.store,
            params: this.params
        })

        return this.quiz.getRoot()
    }

    afterRender() {
        this.quiz.init()
        this.subscriber.subscribeComponents([this.quiz])
    }

    destroy() {
        this.subscriber.unSubscribeFromStore()
        this.quiz.destroy()
    }
}