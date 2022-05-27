import {Page} from "@core/Page";
import {$} from "@core/dom"
import {QuizCreator} from "../components/quizCreator/quizCreator";

export class QuizCreatorPage extends Page {
    constructor(params, store) {
        super(params)
        this.store = store
    }

    getRoot() {
        const $container = $.create('div', 'quiz-creator')

        const $root = $.create('div', 'quiz-creator__form')
        this.quizCreator = new QuizCreator($root, {
            components: [],
        }, this.store)

        console.log('store quizcreatorpage: ', this.store)

        $container.append(this.quizCreator.getRoot())

        return $container
    }

    afterRender() {
        this.quizCreator.init()
    }

    destroy() {
        this.quiz.destroy()
    }
}