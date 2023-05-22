import { useEffect, useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, Animated } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { bookerReservations, deleteReservation } from "../redux/actions/reservationAction"
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput,  Button } from "react-native-paper";
import { format } from 'date-fns'
import { Swipeable } from "react-native-gesture-handler";
import { TrashIcon } from "react-native-heroicons/solid";
import { DELETE_RESERVATION_RESET } from "../redux/constants/reservationConstants";

const MyReservations = ({navigation}) => {

    const dispatch = useDispatch()
    const { reservations, totalAdult, totalChild, loading } = useSelector(state=>state.bookerReservations)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);

    const { isDeleted } = useSelector(state=>state.reservation)

    useEffect(()=>{
        dispatch(bookerReservations(startDate, endDate))

        if(isDeleted){
            dispatch({type: DELETE_RESERVATION_RESET})
        }
    },[startDate, endDate, isDeleted])

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

    const renderRightActions = (
        progress,
        dragAnimatedValue,
        reservationId
      ) => {
        const opacity = dragAnimatedValue.interpolate({
          inputRange: [-150, 0],
          outputRange: [3, 0],
          extrapolate: 'clamp',
        });
        return (
          <View style={{justifyContent:"center"}}>
            <Animated.View style={[{opacity}]}>
              <TouchableOpacity onPress={()=>deleteReservationHandler(reservationId)} style={{marginHorizontal:15}}>
                <TrashIcon color="black"/>
              </TouchableOpacity>
            </Animated.View>
          </View>
        );
      };

    const deleteReservationHandler = (id) => {
        console.log(id)
        dispatch(deleteReservation(id))
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
                <View key={reservation._id}>
                    <Swipeable renderRightActions={(progress, dragAnimatedValue )=>renderRightActions(progress, dragAnimatedValue, reservation._id)} >
                        <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:5, borderRadius: 15, paddingHorizontal:15, paddingVertical:3, backgroundColor: "white", shadowRadius: 15, shadowColor: "black", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.16, elevation:2}}>
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
                    </Swipeable>
                </View>
            ))}
        </ScrollView>
    )
}

export default MyReservations