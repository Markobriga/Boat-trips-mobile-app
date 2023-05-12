import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import { authReducer } from './reducers/userReducer'
import { boatByOwnerReducer } from './reducers/boatReducers';
import { nextTripsByBoatReducer, tripDetailsReducer } from './reducers/tripReducers';
import { allReservationsReducer, bookerReservationsReducer, newReservationReducer } from './reducers/reservationReducers';

const reducer = combineReducers({
    auth: authReducer,
    boatByOwner: boatByOwnerReducer,
    nextTripsByBoat: nextTripsByBoatReducer,
    tripDetails: tripDetailsReducer,
    newReservation: newReservationReducer,
    bookerReservations : bookerReservationsReducer,
    allReservations: allReservationsReducer
})

let initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store