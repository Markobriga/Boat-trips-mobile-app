import { useEffect, useState } from "react"
import { View, Text, ScrollView } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { bookerReservations } from "../redux/actions/reservationAction"
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from "react-native-paper";
import { format } from 'date-fns'

const MyReservations = ({navigation}) => {

    const dispatch = useDispatch()
    const { reservations, totalAdult, totalChild, loading } = useSelector(state=>state.bookerReservations)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);

    useEffect(()=>{
        console.log(startDate)
        console.log(endDate)
        dispatch(bookerReservations(startDate, endDate))
    },[startDate, endDate])

    const changeStart = (event, selectedDate) => {
        if (event.type == "set") {
            setShowStart(false);
            if(selectedDate < endDate) {
                setStartDate(selectedDate);
            }
        }
        else
            setShowStart(false);
    }

    const changeEnd = (event, selectedDate) => {
        if (event.type == "set") {
            setShowEnd(false);
            if(selectedDate > startDate) {
                setEndDate(selectedDate);
            }
        }
        else
            setShowEnd(false);
    }

    return (
        <ScrollView style={{marginHorizontal:10}}> 
            <TextInput onPressIn={()=>setShowStart(1)} showSoftInputOnFocus={false} style={{marginTop:5, backgroundColor:"white"}} activeOutlineColor="#06b6d4" theme={{roundness:5}} label="Start Date" selectionColor="white" mode="outlined" value={format(new Date(startDate), 'dd.MM.yyyy')} />
            {showStart && <DateTimePicker value={startDate} onChange={changeStart} mode="date"/>}
            <TextInput onPressIn={()=>setShowEnd(1)} showSoftInputOnFocus={false} style={{marginTop:5, backgroundColor:"white"}} activeOutlineColor="#06b6d4" theme={{roundness:5}} label="End Date" selectionColor="white" mode="outlined" value={format(new Date(endDate), 'dd.MM.yyyy')} />
            {showEnd && <DateTimePicker value={endDate} onChange={changeEnd} mode="date"/>}
            <View style={{marginVertical:5}}>
                <Text style={{color:"black"}}>Total Adult: {totalAdult}</Text>
                <Text style={{color:"black"}}>Total Child: {totalChild}</Text>
            </View>
            {reservations && reservations.map((reservation)=> (
                <View>
                    <View style={{flexDirection:"row", justifyContent:"space-between", marginVertical:5}}>
                        <View>
                            <Text style={{color:"black", fontWeight:500}}>{reservation.trip.tripName}</Text>
                            <Text style={{color:"black"}}>Name: {reservation.name}</Text>
                            <Text style={{color:"black"}}>Date: {format(new Date(reservation.trip.date), 'dd.MM.yyyy')}</Text>
                        </View>
                        <View style={{alignSelf:"flex-end"}}>
                            <Text style={{color:"black"}}>Adults: {reservation.amountAdult}</Text>
                            <Text style={{color:"black"}}>Children: {reservation.amountChild}</Text>
                        </View>
                        <View style={{alignSelf:"center"}}>   
                            <Text style={{color:"black"}}>{reservation.price}€</Text>
                        </View>
                    </View>
                    <View style={{backgroundColor:"black", height:1}}></View>
                </View>
            ))}
        </ScrollView>
    )
}

export default MyReservations