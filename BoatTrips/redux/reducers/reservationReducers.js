import { CREATE_RESERVATION_REQUEST, CREATE_RESERVATION_SUCCESS, CREATE_RESERVATION_FAIL, BOOKER_RESERVATIONS_REQUEST, BOOKER_RESERVATIONS_SUCCESS, BOOKER_RESERVATIONS_FAIL, ALL_RESERVATIONS_REQUEST, ALL_RESERVATIONS_SUCCESS, ALL_RESERVATIONS_FAIL, DELETE_RESERVATION_REQUEST, DELETE_RESERVATION_SUCCESS, DELETE_RESERVATION_FAIL, DELETE_RESERVATION_RESET, CLEAR_ERRORS } from '../constants/reservationConstants'

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

export const reservationReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_RESERVATION_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_RESERVATION_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case DELETE_RESERVATION_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case DELETE_RESERVATION_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            } 
        default: 
            return state
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

export const allReservationsReducer = (state = {reservations: []}, action) => {
    switch(action.type) {

        case ALL_RESERVATIONS_REQUEST:
            return {
                loading: true
            }
        case ALL_RESERVATIONS_SUCCESS:
            return {
                loading: false,
                reservations: action.payload
            }
        case ALL_RESERVATIONS_FAIL:
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