import axios from 'axios'
import { BOAT_BY_OWNER_REQUEST, BOAT_BY_OWNER_SUCCESS, BOAT_BY_OWNER_FAIL, CLEAR_ERRORS } from "../constants/boatConstants";
const baseUrl = "http://127.0.0.1:4000"

export const getBoatByOwner = (id) => async (dispatch) => {
    try {
        dispatch({ type: BOAT_BY_OWNER_REQUEST })

        const { data } = await axios.get(`${baseUrl}/api/v1/admin/boat/${id}`)

        dispatch({ 
            type: BOAT_BY_OWNER_SUCCESS,
            payload: data.boat
        })

    } catch (error) {
        dispatch({
            type: BOAT_BY_OWNER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}