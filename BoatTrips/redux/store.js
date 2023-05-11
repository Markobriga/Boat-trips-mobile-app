import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import { authReducer } from './reducers/userReducer'
import { boatByOwnerReducer } from './reducers/boatReducers';
import { nextTripsByBoatReducer, tripDetailsReducer } from './reducers/tripReducers';
import { bookerReservationsReducer, newReservationReducer } from './reducers/reservationReducers';

const reducer = combineReducers({
    auth: authReducer,
    boatByOwner: boatByOwnerReducer,
    nextTripsByBoat: nextTripsByBoatReducer,
    tripDetails: tripDetailsReducer,
    newReservation: newReservationReducer,
    bookerReservations : bookerReservationsReducer
})

let initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store