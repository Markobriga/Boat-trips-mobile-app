import { useEffect } from "react"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { getNextTripsByBoat } from "../redux/actions/tripAction"
import TripCard from "../components/TripCard"


const Home = ({navigation}) => {

    const dispatch = useDispatch()
    const { loading, nextTripsByBoat } = useSelector(state => state.nextTripsByBoat)
    const { boat } = useSelector(state => state.boatByOwner)

    useEffect(()=>{
        
        dispatch(getNextTripsByBoat(boat._id))
     
    },[boat, dispatch])

    return (
        <ScrollView>
            {nextTripsByBoat.trips && nextTripsByBoat.trips.map((trip)=> (
                <TouchableOpacity onPress={()=> {navigation.navigate('Make a reservation', { id: trip._id})}} key={trip._id} style={{ marginVertical:5, borderRadius: 15, paddingHorizontal: 15 , marginHorizontal:10, backgroundColor: "white", shadowRadius: 15, shadowColor: "black", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.16, elevation:1 }}>
                    <TripCard trip={trip} maxNumber={boat.maxNumberOfReservations}/>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

export default Home