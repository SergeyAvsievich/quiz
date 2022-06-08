import {QuizComponent} from "@core/QuizComponent";
import {logout} from "@/storage/actions/auth";
import {$} from "@core/dom"

export class Navbar extends QuizComponent {
    static className = 'quiz__navbar'

    constructor($root, options) {
        super($root, {
            name: 'Form',
            listeners: ['click'],
            ...options
        })

        this.$root = $root
        this.store = options.store
    }

    toHTML(){
        return `
        <nav class="navbar-expand-lg navbar-dark">
            <div class="container">
                <div>
                    <h2>
                        admin
                    </h2>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarText"
                        aria-controls="navbarText"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
                <div 
                    class="collapse navbar-collapse justify-content-end" 
                    id="navbarText"
                >
                    <ul class="navbar-nav mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" 
                                aria-current="page" 
                                href="#"
                            >
                                <i class="far fa-list-alt"></i> Список тестов
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" 
                                href="/#creator"
                            >
                                <i class="fas fa-plus-circle"></i>
                                Создать тест
                            </a>
                        </li>
                        <li class="nav-item"
                        >
                            <a class="nav-link"
                                href="/#"
                                data-type="logout"
                            >
                                <i class="fas fa-sign-out-alt"></i>
                                Выход
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        `
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.data.type === 'logout') {
            this.logoutHandler()
        }
    }

    logoutHandler() {
        this.$dispatch(logout())
    }
}