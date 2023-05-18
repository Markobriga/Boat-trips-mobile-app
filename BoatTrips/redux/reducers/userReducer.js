import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL, REGISTER_BOOKER_REQUEST, REGISTER_BOOKER_SUCCESS, REGISTER_BOOKER_FAIL, ALL_BOOKERS_REQUEST, ALL_BOOKERS_SUCCESS, ALL_BOOKERS_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL, CLEAR_ERRORS, UPDATE_PROFILE_REQUEST, UPDATE_PASSWORD_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PASSWORD_SUCCESS, UPDATE_PROFILE_RESET, UPDATE_PASSWORD_RESET, UPDATE_PROFILE_FAIL, UPDATE_PASSWORD_FAIL, DELETE_BOOKER_REQUEST, DELETE_BOOKER_SUCCESS, DELETE_BOOKER_FAIL, DELETE_BOOKER_RESET } from "../constants/userConstants";

export const authReducer = (state = {user: {}}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }
        case LOGIN_FAIL:    
            return {
                ...state,   
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user:null,
                error: action.payload
            }
        case LOGOUT_FAIL:
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

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        case REGISTER_BOOKER_REQUEST:
        case DELETE_BOOKER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case DELETE_BOOKER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case REGISTER_BOOKER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case DELETE_BOOKER_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
        case REGISTER_BOOKER_FAIL:
        case DELETE_BOOKER_FAIL:
            return {
                ...state,
                loading: false,
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

export const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case ALL_BOOKERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ALL_BOOKERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload
            }
        case ALL_BOOKERS_FAIL:
            return {
                ...state,
                loading: false,
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