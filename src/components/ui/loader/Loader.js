import {$} from "@core/dom";

export class Loader {
    constructor() {
        this.loader = $.create('div', 'loader')
    }

    toHTML() {
        return this.loader.html(`
            <div class="loader-container">
                <div class="ldr"></div>
            </div>
        `)
    }
}