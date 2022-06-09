export function createTemplateNavbar(isAdmin) {
    return `
    <nav class="navbar-expand-lg navbar-dark">
        <div class="container">
            <div>
                <h4>
                    ${isAdmin ? 'Администратор' : 'Пользователь'}
                </h4>
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
                    ${createListItems(isAdmin)}
                </ul>
            </div>
        </div>
    </nav>
    `
}

export function createListItems(isAdmin) {
    if (!isAdmin) {
        return `
            <li class="nav-item"
            >
                <a class="nav-link active"
                    href="/#"
                    data-type="logout"
                >
                    <i class="fas fa-sign-in"></i>
                    Вход для администратора
                </a>
            </li>
        `
    }

    return `
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
    `
}