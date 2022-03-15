import {DomListener} from "@core/DomListener";

// наследуется от DomListener, что позволит вешать обработчики
// на каждый компонент

export class QuizComponent extends DomListener{
    constructor($root, options = {}){
        super($root, options.listeners)
        this.name = options.name || ''
        this.store = options.store
        this.storeSub = null
    }

    toHTML(){
        return ``
    }

    $dispatch(action){
        this.store.dispatch(action)
    }

    $subscribe(fn){
        this.storeSub = this.store.subscribe(fn)
    }

    init(){
        this.initDOMListeners()
    }
}