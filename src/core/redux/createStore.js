 export function createStore(reducer, middleWare) {
    let state = reducer(undefined, {type: '__INIT__'})
    let subscribers = []

    if (typeof middleWare === 'function') {
        return middleWare(createStore)(reducer, state)
    }

    function subscribe(callback){
        subscribers.push(callback)
        return {
            unsubscribe() {
                subscribers = subscribers.filter(s => s !== callback)
            }
        }
    }

    function dispatch(action){
        state = reducer(state, action)

        subscribers.forEach(subscriber => subscriber(state))
    }

    function getState(){
        return JSON.parse(JSON.stringify(state))
    }

    return {
        getState: getState,
        dispatch: dispatch,
        subscribe: subscribe
    }
}