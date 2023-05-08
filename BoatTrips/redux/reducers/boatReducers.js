import { BOAT_BY_OWNER_REQUEST, BOAT_BY_OWNER_SUCCESS, BOAT_BY_OWNER_FAIL, CLEAR_ERRORS } from "../constants/boatConstants";

export const boatByOwnerReducer = (state = {boat : {}}, action) => {
    switch(action.type) {

        case BOAT_BY_OWNER_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case BOAT_BY_OWNER_SUCCESS:
            return {
                loading: false,
                boat: action.payload
            }

        case BOAT_BY_OWNER_FAIL:
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