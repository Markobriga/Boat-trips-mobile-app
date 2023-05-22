import { useEffect } from "react"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { allReservations } from "../redux/actions/reservationAction"
import { ActivityIndicator, Button } from "react-native-paper"
import { format } from 'date-fns'

const Reservations = ({route, navigation}) => {

    const dispatch = useDispatch()
    const { id } = route.params
    const { loading, reservations } = useSelector(state=>state.allReservations)
    const { user } = useSelector(state => state.auth)

    useEffect(()=> {
        dispatch(allReservations(id))
    },[dispatch, id])

    return (
        <ScrollView>
            {loading ? <ActivityIndicator animating={true} /> : reservations.reservations && reservations.reservations.map((reservation)=>(
                <View key={reservation._id} style={{marginHorizontal:15, marginVertical:5, backgroundColor:"white", paddingHorizontal:15, paddingVertical:8, borderRadius:15, shadowRadius:15, shadowColor:"black", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.16, elevation:1}}>
                    <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                        <Text style={{color:"black", fontWeight:500}}>{reservation.booker.name}</Text>
                        <Text style={{color:"black", fontWeight:200}}>{format(new Date(reservation.createdAt), 'dd.MM.yyyy. HH:mm')}</Text>
                    </View>
                    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                        <View>
                            <Text style={{color:"black"}}>Name: {reservation.name}</Text>
                            <Text style={{color:"black"}}>{reservation.phoneNumber}</Text>
                            <Text style={{color:"black"}}>Adults: {reservation.amountAdult}</Text>
                            <Text style={{color:"black"}}>Children: {reservation.amountChild}</Text>
                        </View>
                        <Text style={{color:"black", fontWeight:500}}>{reservation.price.toFixed(2)}€</Text>
                    </View>
                    
                    
                </View>
            ))}
        </ScrollView>
    )

}

export default Reservations;