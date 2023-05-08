import { NEXT_TRIPS_BY_BOAT_REQUEST, NEXT_TRIPS_BY_BOAT_SUCCESS, NEXT_TRIPS_BY_BOAT_FAIL, CLEAR_ERRORS } from "../constants/tripConstants";

export const nextTripsByBoatReducer = (state = { nextTripsByBoat: []}, action) => {
    switch (action.type) {
        case NEXT_TRIPS_BY_BOAT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case NEXT_TRIPS_BY_BOAT_SUCCESS:
            return {
                loading: false,
                nextTripsByBoat: action.payload
            }
        case NEXT_TRIPS_BY_BOAT_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default: 
            return state
    }
}