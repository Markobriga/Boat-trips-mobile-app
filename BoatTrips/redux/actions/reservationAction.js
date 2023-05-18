import axios from 'axios';
import { CREATE_RESERVATION_REQUEST, CREATE_RESERVATION_SUCCESS, CREATE_RESERVATION_FAIL, BOOKER_RESERVATIONS_REQUEST, BOOKER_RESERVATIONS_SUCCESS, BOOKER_RESERVATIONS_FAIL, ALL_RESERVATIONS_REQUEST, ALL_RESERVATIONS_SUCCESS, ALL_RESERVATIONS_FAIL, DELETE_RESERVATION_REQUEST, DELETE_RESERVATION_SUCCESS, DELETE_RESERVATION_FAIL } from '../constants/reservationConstants'
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

export const bookerReservations = (startDate, endDate) => async (dispatch, getState) => {
    try {
        dispatch({ type: BOOKER_RESERVATIONS_REQUEST });

        const { data } = await axios.get(`${baseUrl}/api/v1/booker/reservations/me?startdate=${startDate.toJSON()}&enddate=${endDate.toJSON()}`)

        dispatch({
            type: BOOKER_RESERVATIONS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: BOOKER_RESERVATIONS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const allReservations = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ALL_RESERVATIONS_REQUEST });

        const { data } = await axios.get(`${baseUrl}/api/v1/owner/reservations/${id}`)

        dispatch({
            type: ALL_RESERVATIONS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_RESERVATIONS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteReservation = (id) => async ( dispatch ) => {
    try {

        dispatch({ type: DELETE_RESERVATION_REQUEST})

        const { data } = await axios.delete(`${baseUrl}/api/v1/booker/reservation${id}`)

        dispatch({
            type: DELETE_RESERVATION_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({ 
            type: DELETE_RESERVATION_FAIL, 
            payload: error.response.data.message 
        })
    }
}