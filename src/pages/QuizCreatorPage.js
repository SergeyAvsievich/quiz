import {Page} from "@core/Page";
import {$} from "@core/dom"
import {QuizCreator} from "../components/quizCreator/quizCreator";
import {navigate} from "../core/utils";

export class QuizCreatorPage extends Page {
    constructor(params, store) {
        super(params)
        this.store = store

        if (!this.isAdmin()) {
            navigate('')
        }
    }

    isAdmin() {
        return this.store.getState().token
    }

    getRoot() {
        const $container = $.create('div', 'quiz-creator')

        const $root = $.create('div', 'quiz-creator__form')
        this.quizCreator = new QuizCreator($root, {
        }, this.store)

        $container.append(this.quizCreator.getRoot())

        return $container
    }

    afterRender() {
        this.quizCreator.init()
    }

    destroy() {
        this.quizCreator.destroy()
    }
}