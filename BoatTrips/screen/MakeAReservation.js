import { useEffect, useState } from 'react'
import { View, Text, ScrollView } from "react-native"
import { TextInput, Button, ActivityIndicator } from "react-native-paper"
import { useDispatch, useSelector } from "react-redux"
import { getTripsDetails } from '../redux/actions/tripAction'
import { format } from 'date-fns'
import { createReservation } from '../redux/actions/reservationAction'
import { CREATE_RESERVATION_RESET } from '../redux/constants/reservationConstants'
import Toast from 'react-native-toast-message';

const MakeAReservation = ({route, navigation}) => {

    const dispatch = useDispatch()
    const { id } = route.params
    const { loading, trip } = useSelector(state=>state.tripDetails)
    const { user } = useSelector(state=>state.auth)
    const { order, error } = useSelector(state=>state.newReservation)

    const [adult, setAdult] = useState(1)
    const [child, setChild] = useState(0)
    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    useEffect(()=>{

        dispatch(getTripsDetails(id))
        if(order) {
            Toast.show({
                type:"success",
                text1:"Created a new reservation"
            })
            dispatch({type: CREATE_RESERVATION_RESET})
            navigation.navigate('MyDrawer')
        }
        if (error) {
            Toast.show({
                type:"error",
                text1: error
            })
            dispatch({type: CREATE_RESERVATION_RESET})
        }

    },[dispatch, id, order, error])

    const reservationHandler = () => {
        
        const reservation = {
            booker: user._id,
            trip: trip._id,
            name: name,
            phoneNumber: phoneNumber,
            amountAdult: adult,
            amountChild: child,
            price: adult*trip.priceAdult+child*trip.priceChild
        }

        dispatch(createReservation(reservation))

    }



    return (
        <ScrollView>
            { loading ? <ActivityIndicator animating={true}/> : 
            trip != undefined && 
            <View style={{marginHorizontal:15}}>
                <Text style={{color:"black", fontSize:25, fontWeight:500}}>{trip?.tripName}</Text>
                <TextInput style={{marginTop:5, backgroundColor:"white"}} activeOutlineColor="#06b6d4" theme={{roundness:5}} label="Name" selectionColor="white" mode="outlined" value={name} onChangeText={(name)=>setName(name)}/>
                <TextInput style={{marginTop:5, backgroundColor:"white"}} activeOutlineColor="#06b6d4" theme={{roundness:5}} label="Phone Number" selectionColor="white" mode="outlined" keyboardType="phone-pad" value={phoneNumber} onChangeText={(phoneNumber)=>setPhoneNumber(phoneNumber)}/>
                <Text style={{marginTop:15, color:"black"}}>Adults (13-80)</Text>
                <View style={{flexDirection:"row", justifyContent:"flex-start", alignItems:"center"}}>
                    <Button buttonColor='#06b6d4' style={{borderRadius:10}} disabled={adult<2} onPress={()=>setAdult(adult-1)}><Text style={{color:"white", fontSize:20}}>-</Text></Button>
                    <Text style={{color:"black", width:30, textAlign:"center"}}>{adult}</Text>
                    <Button buttonColor='#06b6d4' style={{borderRadius:10}} disabled={adult+child+trip.numberOfReservations>trip.boat.maxNumberOfReservations} onPress={()=>{setAdult(adult+1)}}><Text style={{color:"white", fontSize:20}}>+</Text></Button>
                </View>
                <Text style={{marginTop:15, color:"black"}}>Children (3-12)</Text>
                <View style={{flexDirection:"row", justifyContent:"flex-start", alignItems:"center"}}>
                    <Button buttonColor='#06b6d4' style={{borderRadius:10}} disabled={!child} onPress={()=> {setChild(child-1)}}><Text style={{color:"white", fontSize:20}}>-</Text></Button>
                    <Text style={{color:"black", width:30, textAlign:"center"}}>{child}</Text>
                    <Button buttonColor='#06b6d4' style={{borderRadius:10}} disabled={adult+child+trip.numberOfReservations>trip.boat.maxNumberOfReservations} onPress={()=>{setChild(child+1)}}><Text style={{color:"white", fontSize:20}}>+</Text></Button>
                </View>

                <View style={{marginTop:15, borderRadius:10, borderColor:"#4a5568", borderWidth:1, backgroundColor:"#f7fafc"}}>
                    <View style={{paddingHorizontal:10, backgroundColor:"#4a5568", paddingVertical:5, borderTopRightRadius:9, borderTopLeftRadius:9}}>
                        <Text style={{color:"white", fontWeight:500, fontSize:20}}>Booking summary</Text>
                    </View>
                    <View style={{paddingHorizontal:10}}>
                        <View style={{marginVertical:10}}>
                            <Text style={{color:"black", fontWeight:500}}>Tickets</Text>
                            <View style={{flexDirection:"row"}}>
                                <Text style={{color:"black"}}>Adults: </Text>
                                <Text style={{color:"black"}}>{adult}x{trip?.priceAdult}€</Text>
                            </View>
                            {child>0 && <View style={{flexDirection:"row"}}>
                                <Text style={{color:"black"}}>Children: </Text>
                                <Text style={{color:"black"}}>{child}x{trip?.priceChild}€</Text>
                            </View>
                            }
                        </View>
                    </View>
                    <View style={{marginHorizontal:10, height:1, backgroundColor:"black"}}></View>
                    <View style={{paddingHorizontal:10}}>
                        <View style={{marginVertical:10}}>
                            <Text style={{color:"black", fontWeight:500}}>Date</Text>
                            {trip?.date &&
                            <Text style={{color:"black"}}>{format(new Date(trip.date), 'dd.MM.yyyy')}</Text>}
                        </View>
                    </View>
                    <View style={{marginHorizontal:10, height:1, backgroundColor:"black"}}></View>
                    <View style={{paddingHorizontal:10}}>
                        <View style={{marginVertical:10}}>
                            <Text style={{color:"black", fontWeight:500}}>{(adult*trip.priceAdult+child*trip.priceChild).toFixed(2)}€</Text>
                        </View>
                    </View>
                </View>
                <View style={{marginTop:10}}>
                    <Button onPress={reservationHandler} mode='contained' style={{borderRadius:10, backgroundColor:"#06b6d4"}}>
                        <Text style={{color:"white", fontWeight:500}}>Make a reservation</Text>
                    </Button>
                </View>
            </View>}
        </ScrollView>
        
    )
}

export default MakeAReservation