import axios from 'axios';
import { NEXT_TRIPS_BY_BOAT_REQUEST, NEXT_TRIPS_BY_BOAT_SUCCESS, NEXT_TRIPS_BY_BOAT_FAIL, CLEAR_ERRORS } from "../constants/tripConstants";
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