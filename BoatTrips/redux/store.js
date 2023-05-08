import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import { authReducer } from './reducers/userReducer'
import { boatByOwnerReducer } from './reducers/boatReducers';

const reducer = combineReducers({
    auth: authReducer,
    boatByOwner: boatByOwnerReducer
})

let initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store