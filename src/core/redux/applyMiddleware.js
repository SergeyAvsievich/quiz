export function applyMiddleware(middleware) {
    return (createStore) => (rootReducer) => {
        const store = createStore(rootReducer)
        return {
            dispatch: action => middleware(store)(store.dispatch)(action),
            getState: store.getState,
            subscribe: store.subscribe
        }
    }
}