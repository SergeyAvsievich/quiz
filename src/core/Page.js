import {preventDefault} from "./utils"

export class Page {
    constructor(params) {
        this.params = params
    }

    getRoot(){
        throw new Error('Method "getRoot" not implemented')
    }

    afterRender(){
        if (process.env.NODE_ENV === 'production') {
            document.addEventListener('contextmenu', preventDefault)
        }
    }

    destroy(){
        document.removeEventListener('contextmenu', preventDefault)
    }
}