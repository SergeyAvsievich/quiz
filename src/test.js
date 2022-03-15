import {createStore} from "./core/createStore"
import {addNumber} from "./redux/actions/action"
import {rootReducer} from "./redux/reducers/rootReducer"

const store = createStore(rootReducer)

store.dispatch(addNumber())
store.dispatch(addNumber())
store.dispatch(addNumber())

store.subscribe(() => console.log('store: ', store.getState()))