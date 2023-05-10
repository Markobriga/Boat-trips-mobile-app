import axios from 'axios';
import { CREATE_RESERVATION_REQUEST, CREATE_RESERVATION_SUCCESS, CREATE_RESERVATION_FAIL } from '../constants/reservationConstants'
const baseUrl = "http://127.0.0.1:4000"

export const createReservation = (reservation) => async (dispatch, getState) => {
    try {

        dispatch({ type: CREATE_RESERVATION_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`${baseUrl}/api/v1/booker/reservation/new`, reservation, config)

        dispatch({
            type: CREATE_RESERVATION_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CREATE_RESERVATION_FAIL,
            payload: error.response.data.message
        })
    }
}