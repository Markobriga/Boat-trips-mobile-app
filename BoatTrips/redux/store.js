import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import { allUsersReducer, authReducer, userReducer } from './reducers/userReducer'
import { boatByOwnerReducer } from './reducers/boatReducers';
import { newTripReducer, nextTripsByBoatReducer, tripDetailsReducer, tripsByBoatReducer } from './reducers/tripReducers';
import { allReservationsReducer, bookerReservationsReducer, newReservationReducer, reservationReducer } from './reducers/reservationReducers';

const reducer = combineReducers({
    auth: authReducer,
    boatByOwner: boatByOwnerReducer,
    newTrip: newTripReducer,
    nextTripsByBoat: nextTripsByBoatReducer,
    tripDetails: tripDetailsReducer,
    tripsByBoat: tripsByBoatReducer,
    newReservation: newReservationReducer,
    bookerReservations : bookerReservationsReducer,
    allReservations: allReservationsReducer,
    reservation: reservationReducer,
    allUsers: allUsersReducer,
    user: userReducer
})

let initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store