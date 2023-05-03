import axios from 'axios'
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } from '../constants/userConstants'
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

        const { data } = await axios.post(`${baseUrl}/api/v1/login`, {email, password}, config)
        
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

async function storeToken(token) {
    try {
        await AsyncStorage.setItem('token', token)
    } catch (error) {
        console.log(error)
    }
}