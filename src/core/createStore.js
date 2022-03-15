export function createStore(reducer){
    let state = reducer(undefined, {type: '__INIT__'})
    let subscribers = []

    return {
        subscribe(callback){
            subscribers.push(callback)
            return () => {
                subscribers = subscribers.filter(s => s !== callback)
            }
        },
        dispatch(action){
            state = reducer(state, action)

            subscribers.forEach(subscriber => subscriber(state))
        },
        getState(){
            return JSON.parse(JSON.stringify(state))
        },
    }
}