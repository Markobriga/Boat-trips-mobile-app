import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import { authReducer } from './reducers/userReducer'
import { boatByOwnerReducer } from './reducers/boatReducers';
import { nextTripsByBoatReducer, tripDetailsReducer } from './reducers/tripReducers';

const reducer = combineReducers({
    auth: authReducer,
    boatByOwner: boatByOwnerReducer,
    nextTripsByBoat: nextTripsByBoatReducer,
    tripDetails: tripDetailsReducer
})

let initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store