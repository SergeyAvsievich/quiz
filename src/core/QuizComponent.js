import {DomListener} from "@core/DomListener";

// наследуется от DomListener, что позволит вешать обработчики
// на каждый компонент

export class QuizComponent extends DomListener{
    constructor($root, options = {}){
        super($root, options.listeners)
        this.name = options.name || ''
        this.subscribe = options.subscribe || []
        this.store = options.store
        this.unsubscribers = []

        this.prepare()
    }

    // hooks до срабатывает до init
    prepare(){}

    toHTML(){
        return ``
    }

    $dispatch(action){
        this.store.dispatch(action)
    }

    // Сюда приходят изменения по тем полям, на которые мы подписались
    storeChanged(){}

    isWatching(key) {
        return this.subscribe.includes(key)
    }

    init(){
        this.initDOMListeners()
    }

    destroy(){
        this.removeDOMListener()
        this.onSubscribers.forEach(unsub => unsub())
    }
}