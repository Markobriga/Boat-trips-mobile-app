import { Text, View } from 'react-native'
import { format } from "date-fns";

const TripCard = ({ trip, maxNumber }) => {


    return (
        <View style={{ marginTop: 5, marginBottom: 5, borderRadius: 15, paddingHorizontal: 10, backgroundColor: "white", shadowRadius: 15, shadowColor: "black", shadowOffset: { width: 0, height: 16 }, shadowOpacity: 0.5, elevation: 10 }}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems:"center" }}>
                <View>
                    <Text style={{color: "black"}}>{format(new Date(trip.date), 'dd.MM.yyyy')}</Text>  
                    <Text style={{color: "black", fontWeight:"500", fontSize:20}}>{trip.tripName}</Text>
                    <Text style={{color: "black"}}>Locations: {trip.location.toString()}</Text>
                    <Text style={{color: "black"}}>Price adult: {trip.priceAdult}€</Text>
                    <Text style={{color: "black"}}>Price child: {trip.priceChild}€</Text>
                </View>
                <View>
                    <Text style={{color: "black", fontWeight:"500"}}>{trip.numberOfReservations}/{maxNumber}</Text>
                </View>
            </View>
            
        </View>
    )
}

export default TripCard;