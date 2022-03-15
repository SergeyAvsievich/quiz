export function createStore(reducer){
    let state = reducer(undefined, {type: '__INIT__'})
    const subscribers = []

    return {
        subscribe(callback){
            subscribers.push(callback)
        },
        dispatch(action){
            state = reducer(state, action)

            subscribers.forEach(subscriber => subscriber())
        },
        getState(){
            return state
        },
    }
}