import axios from 'axios'
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL, ALL_BOOKERS_REQUEST, ALL_BOOKERS_SUCCESS, ALL_BOOKERS_FAIL, REGISTER_BOOKER_REQUEST, REGISTER_BOOKER_SUCCESS, REGISTER_BOOKER_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PASSWORD_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PASSWORD_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PASSWORD_FAIL, DELETE_BOOKER_REQUEST, DELETE_BOOKER_SUCCESS, DELETE_BOOKER_FAIL } from '../constants/userConstants'
import AsyncStorage from '@react-native-async-storage/async-storage';
const baseUrl = "http://127.0.0.1:4000"

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST})
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`${baseUrl}/api/v1/booker/login`, {email, password}, config)
        
        dispatch({ 
            type: LOGIN_SUCCESS,
            payload: data.user
        })
        storeToken(data.token)

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

export const loadUser = () => async (dispatch) => {

    try {
        dispatch({ type:LOAD_USER_REQUEST})
        const token = await getToken()
        console.log(token)
        const config = {
            headers: {
                "token": token
            }
        } 
        const { data } = await axios.get(`${baseUrl}/api/v1/me`, config)

        dispatch({
            type:LOAD_USER_SUCCESS,
            payload: data.user
        })

    } catch(error) {
        dispatch({ 
            type:LOAD_USER_FAIL, 
            payload: error.response.data.message
        })
    
    }
}

export const updateProfile = (userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PROFILE_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`${baseUrl}/api/v1/me/update`, userData, config)

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })

    } catch(error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updatePassword = (passwords) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PASSWORD_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`${baseUrl}/api/v1/password/update`, passwords, config)

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch(error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

export const allBookers = (id) => async (dispatch) => {
    try {
        dispatch({ type: ALL_BOOKERS_REQUEST})

        const { data } = await axios.get(`${baseUrl}/api/v1/owner/bookers/${id}`)

        dispatch({
            type: ALL_BOOKERS_SUCCESS,
            payload: data.bookers
        })

    } catch (error) {
        dispatch({ 
            type: ALL_BOOKERS_FAIL, 
            payload: error.response.data.message 
        })
    }
}

export const registerBooker = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_BOOKER_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post(`${baseUrl}/api/v1/owner/register/booker`, userData, config)

        dispatch({
            type: REGISTER_BOOKER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: REGISTER_BOOKER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteBooker = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_BOOKER_REQUEST})

        const { data } = await axios.delete(`${baseUrl}/api/v1/owner/booker/${id}`)

        dispatch({
            type: DELETE_BOOKER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({ 
            type: DELETE_BOOKER_FAIL, 
            payload: error.response.data.message 
        })
    }
}


export const logout = () => async (dispatch) => {
    try {
        await axios.get(`${baseUrl}/api/v1/logout`)
        await AsyncStorage.removeItem('token')

        dispatch({ 
            type:LOGOUT_SUCCESS
        })

    } catch (error) {
        dispatch({ 
            type:LOGOUT_FAIL,
            payload: error.response.data.message 
        })
    }
}

async function storeToken(token) {
    try {
        await AsyncStorage.setItem('token', token)
    } catch (error) {
        console.log(error)
    }
}

async function getToken() {
    try {
        const token = await AsyncStorage.getItem('token')
        return token
    } catch (error) {
        console.log(error)
    }
}