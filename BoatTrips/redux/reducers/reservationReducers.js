import { CREATE_RESERVATION_REQUEST, CREATE_RESERVATION_SUCCESS, CREATE_RESERVATION_FAIL, BOOKER_RESERVATIONS_REQUEST, BOOKER_RESERVATIONS_SUCCESS, BOOKER_RESERVATIONS_FAIL, CLEAR_ERRORS } from '../constants/reservationConstants'

export const newReservationReducer = (state = {}, action) => {
    switch (action.type) {

        case CREATE_RESERVATION_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_RESERVATION_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case CREATE_RESERVATION_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default: return state
    }
}

export const bookerReservationsReducer = (state = {reservations: []}, action) => {
    switch(action.type) {

        case BOOKER_RESERVATIONS_REQUEST:
            return {
                loading: true
            }
        case BOOKER_RESERVATIONS_SUCCESS:
            return {
                loading: false,
                reservations: action.payload.reservations,
                totalAdult: action.payload.totalAdult,
                totalChild: action.payload.totalChild
            }
        case BOOKER_RESERVATIONS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}