import {QuizComponent} from "@core/QuizComponent";

export class Navbar extends QuizComponent{
    static className = 'quiz__navbar'
    toHTML(){
        return `
        <nav class="navbar navbar-expand-lg navbar-dark">
            <div class="container">
                <a class="navbar-brand me-5" href="#">Quiz &nbsp;
                    <strong style="transform: rotate(17deg)">A</strong><i>pp</i>
                </a>
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
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
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
                                href="/src/pages/createTest.html"
                            >
                                <i class="fas fa-plus-circle"></i>
                                Создать тест
                            </a>
                        </li>
                    </ul>
                        <span class="text-white">
                            <i class="fas fa-user-circle me-1"></i>
                            <strong class="me-1">
                                <i>Сергей Владимирович</i>
                                </i>
                            </strong>
                            <i class="fas fa-chevron-circle-down"></i>
                        </span>
                    </div>
                </div>
            </nav>
        `
    }
}