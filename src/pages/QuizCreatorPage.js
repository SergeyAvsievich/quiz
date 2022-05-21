import {Page} from "@core/Page";
import {$} from "@core/dom"
import {QuizCreator} from "../components/quizCreator/quizCreator";

export class quizCreatorPage extends Page {
    constructor(params) {
        super(params)
    }

    getRoot() {
        const $container = $.create('div', 'quiz-creator')

        const $root = $.create('div', 'quiz-creator__form')
        this.quizCreator = new QuizCreator($root, {
            components: [],
        })

        $container.html(this.quizCreator.getRoot())

        // $container.append()

        return $container
    }

    afterRender() {
        this.auth.init()
    }

    destroy() {
        this.quiz.destroy()
    }
}