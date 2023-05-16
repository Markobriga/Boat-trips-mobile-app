import { useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { getTripsByBoat } from '../redux/actions/tripAction'
import { ActivityIndicator, Button } from 'react-native-paper'
import { format } from 'date-fns'


const Trips = ({navigation}) => {

    const dispatch = useDispatch()
    const { user }  = useSelector(state=>state.auth)
    const { loading, tripsByBoat } = useSelector(state=>state.tripsByBoat)
    const { boat } = useSelector(state => state.boatByOwner)
    
    useEffect(()=>{
        if(user.role==="booker") {
            dispatch(getTripsByBoat(user.owner))
        }
        else if(user.role==="owner") {
            dispatch(getTripsByBoat(user._id))
        }
    },[dispatch])

    return (
        <ScrollView>
            {loading ? <ActivityIndicator animating={true}/> : 
            <View>
                {user.role==="owner" && <Button onPress={()=>{navigation.navigate("New Trip")}}>Add new trip</Button>}
                {tripsByBoat.trips && tripsByBoat.trips.map((trip)=>(
                <TouchableOpacity key={trip._id} onPress={()=>{navigation.navigate('Reservations', { id: trip._id})}} style={{marginTop: 5, marginBottom: 5, borderRadius: 15, marginHorizontal: 15 , backgroundColor: "white", shadowRadius: 15, shadowColor: "black", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.16, elevation:1}}>
                    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"flex-end", marginHorizontal:15, marginVertical:8}}>
                        <View style={{}}>
                            <Text style={{color:"black"}}>{format(new Date(trip.date), 'dd.MM.yyyy')}</Text>
                            <Text style={{color:"black", fontWeight:500}}>{trip.tripName}</Text>
                        </View>
                        <View>
                            <Text style={{color:"black", fontWeight:500}}>{trip.numberOfReservations}/{boat.maxNumberOfReservations}</Text>
                        </View>
                    </View>
                    
                </TouchableOpacity>
                ))}
            </View>
            }
        </ScrollView>
    )
}

export default Trips