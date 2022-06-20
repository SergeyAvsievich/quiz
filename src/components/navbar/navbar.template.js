export function createTemplateNavbar(isAdmin) {
    return `
    <nav class="navbar navbar-expand-lg">
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
            <li class="nav-item">
                <a class="nav-link active"
                    href="/#admin"
                    data-type="admission"
                >
                    <i class="fas fa-sign-in"></i>
                    Вход для администратора
                </a>
            </li>
        `
    }

    return `
        <li class="nav-item">
            <a class="nav-link" 
                href="/#"
                data-type="test-list"
            >
                <i class="far fa-list-alt"></i> Список тестов
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" 
                href="/#creator"
                data-type="create"
            >
                <i class="fas fa-plus-circle"></i>
                Создать тест
            </a>
        </li>
        <li class="nav-item"
        >
            <a class="nav-link"
                href="/#logout"
                data-type="logout"
            >
                <i class="fas fa-sign-out-alt"></i>
                Выход
            </a>
        </li>
    `
}