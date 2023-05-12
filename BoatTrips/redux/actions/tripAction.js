import axios from 'axios';
import { NEXT_TRIPS_BY_BOAT_REQUEST, NEXT_TRIPS_BY_BOAT_SUCCESS, NEXT_TRIPS_BY_BOAT_FAIL, TRIP_DETAILS_REQUEST, TRIP_DETAILS_SUCCESS, TRIP_DETAILS_FAIL, TRIPS_BY_BOAT_REQUEST, TRIPS_BY_BOAT_SUCCESS, TRIPS_BY_BOAT_FAIL, CLEAR_ERRORS } from "../constants/tripConstants";
const baseUrl = "http://127.0.0.1:4000"

export const getNextTripsByBoat = (boat) => async (dispatch) => {
    try {

        dispatch({ type: NEXT_TRIPS_BY_BOAT_REQUEST })

        const { data } = await axios.get(`${baseUrl}/api/v1/trips/next/${boat}`)

        dispatch({
            type: NEXT_TRIPS_BY_BOAT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch ({
            type: NEXT_TRIPS_BY_BOAT_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getTripsDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: TRIP_DETAILS_REQUEST })
        
        const { data } = await axios.get(`${baseUrl}/api/v1/trip/${id}`)

        dispatch({
            type: TRIP_DETAILS_SUCCESS,
            payload: data.trip
        })

    } catch (error) {
        dispatch ({
            type: TRIP_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getTripsByBoat = (user) => async (dispatch) => {
    try {

        dispatch({ type: TRIPS_BY_BOAT_REQUEST })

        const { data } = await axios.get(`${baseUrl}/api/v1/owner/trips/${user}`)

        dispatch({
            type: TRIPS_BY_BOAT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch ({
            type: TRIPS_BY_BOAT_FAIL,
            payload: error.response.data.message
        })
    }
}