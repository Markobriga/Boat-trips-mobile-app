import { useEffect } from "react"
import { View, Text, ScrollView } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { getNextTripsByBoat } from "../redux/actions/tripAction"
import TripCard from "../components/TripCard"


const Home = ({navigation}) => {

    const dispatch = useDispatch()
    const { loading, nextTripsByBoat } = useSelector(state => state.nextTripsByBoat)
    const { boat } = useSelector(state => state.boatByOwner)

    useEffect(()=>{
        dispatch(getNextTripsByBoat(boat._id))
    },[boat])

    return (
        <ScrollView>
            {nextTripsByBoat.trips && nextTripsByBoat.trips.map((trip)=> (
                <TripCard trip={trip} key={trip._id} maxNumber={boat.maxNumberOfReservations}/>
            ))}
        </ScrollView>
    )
}

export default Home