import { useEffect, useState } from "react"
import { View, Text } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { bookerReservations } from "../redux/actions/reservationAction"

const MyReservations = ({navigation}) => {

    const dispatch = useDispatch()
    const { reservations, totalAdult, totalChild, loading } = useSelector(state=>state.bookerReservations)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    useEffect(()=>{
        console.log(startDate)
        console.log(endDate)
        dispatch(bookerReservations(startDate, endDate))
    },[])

    return (
        <View>
            <Text>MyReservations</Text>
        </View>
    )
}

export default MyReservations