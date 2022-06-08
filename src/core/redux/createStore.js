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

// export function createStore(rootReducer, middleWare) {
//     let state = {}
//     let subscribers = []

//     if (typeof middleWare === 'function') {
//         return middleWare(createStore)(rootReducer, state)
//     }

//     function subscribe(callback){
//         subscribers.push(callback)
//         return () => {
//             subscribers = subscribers.filter(s => s !== callback)
//         }
//     }

//     function dispatch(action){
//         if (!Object.keys(state).length){
//                 state = rootReducer( undefined, '__@INIT__')
//         } else {
//             state = rootReducer(state, action)
//         }
//         subscribers.forEach(el => el())
//     }

//     function getState(){
//         return state
//     }

//     return {
//         getState: getState,
//         dispatch: dispatch,
//         subscribe: subscribe
//     }
// }