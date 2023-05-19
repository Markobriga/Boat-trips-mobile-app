import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { TextInput, Button, Checkbox } from "react-native-paper"
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns'
import { newTrip } from "../redux/actions/tripAction";
import { NEW_TRIP_RESET } from "../redux/constants/tripConstants";
import Toast from 'react-native-toast-message';

const NewTrip = ({navigation}) => {

    const dispatch = useDispatch()
    const { boat } = useSelector(state=>state.boatByOwner)
    const { user } = useSelector(state=>state.auth)
    const { error, success } = useSelector(state => state.newTrip);

    const [name, setName] = useState("")
    const [priceAdult, setPriceAdult] = useState("")
    const [priceChild, setPriceChild] = useState("")
    const [duration, setDuration] = useState("")
    const [locations, setLocations] = useState([])
    const [date, setDate] = useState(new Date())
    const [checkedState, setCheckedState] = useState()
    const [showDate, setShowDate] = useState(false)

    useEffect(()=>{
        if(boat.locations) {
            setCheckedState(new Array(boat.locations.length).fill(false))
        }
    },[boat])

    useEffect(()=>{
        if(success) {
            Toast.show({
                type: "success",
                text1: "Added new trip"
            })
            //dispatch({type: NEW_TRIP_RESET})
            navigation.navigate("MyDrawer", { screen: 'Trips'})
        }
        if(error) {
            Toast.show({
                type: "error",
                text1: error
            })
        }
    },[success, error, dispatch])

    const changeDate = (event, selectedDate) => {
        if (event.type == "set") {
            setShowDate(false);
    
            setDate(selectedDate);
        }
        else
            setShowStart(false);
    }

    const handleOnChange = (position) => {
        let temp=[]
        const updatedCheckedState = checkedState.map((item, index) => 
            index === position ? !item : item
        )

        updatedCheckedState.map((item, index) => 
            item === true && temp.push(boat.locations[index])
        )

        setCheckedState(updatedCheckedState)
        temp = temp.sort();
        setLocations(temp)
    }

    const handleSubmit = () => {
        const formData = new FormData()

        formData.set('tripName', name)
        formData.set('boatName', boat.name)
        formData.set('priceAdult', priceAdult)
        formData.set('priceChild', priceChild)
        formData.set('date', date)
        formData.set('duration', duration)
        formData.set('location', locations)
        formData.set('boat', boat._id)
        formData.set('user', user._id)

        dispatch(newTrip(formData))
    }

    return (
        <ScrollView style={{marginHorizontal:12, flexDirection: "column"}}>
            <TextInput style={{marginTop:5, backgroundColor:"white"}} activeOutlineColor="#06b6d4" theme={{roundness:5}} label="Name" selectionColor="white" mode="outlined" value={name} onChangeText={(text) => setName(text)} />
            <TextInput onPressIn={()=>setShowDate(true)} showSoftInputOnFocus={false} style={{marginTop:5, backgroundColor:"white"}} activeOutlineColor="#06b6d4" theme={{roundness:5}} label="Date" selectionColor="white" mode="outlined" value={format(new Date(date), 'dd.MM.yyyy')} />
            {showDate && <DateTimePicker minimumDate={new Date()} value={date} onChange={changeDate} mode="date"/>}
            <TextInput style={{marginTop:5, backgroundColor:"white"}} activeOutlineColor="#06b6d4" theme={{roundness:5}} label="Price Adult" selectionColor="white" mode="outlined" keyboardType="numeric" value={priceAdult} onChangeText={(text) => setPriceAdult(text)}/>
            <TextInput style={{marginTop:5, backgroundColor:"white"}} activeOutlineColor="#06b6d4" theme={{roundness:5}} label="Price Child" selectionColor="white" mode="outlined" keyboardType="numeric" value={priceChild} onChangeText={(text) => setPriceChild(text)}/>
            <TextInput style={{marginTop:5, backgroundColor:"white"}} activeOutlineColor="#06b6d4" theme={{roundness:5}} label="Duration" selectionColor="white" mode="outlined" keyboardType="numeric" value={duration} onChangeText={(text) => setDuration(text)}/>
            <Text style={{color:"black", marginTop:8, fontSize:18, marginLeft:8}}>Locations:</Text>
            {checkedState && boat.locations && boat.locations.map((location, index) =>
                <View style={{flexDirection:"row", alignItems:"center"}} key={location}>
                    <Checkbox 
                        status={checkedState[index] ? 'checked' : 'unchecked'}
                        onPress={()=>handleOnChange(index)}
                        label={location}
                        style={{padding:0, margin:0}}
                    />
                    <Text style={{color:"black", fontSize:18}}>{location}</Text>
                </View>
            )}
            <Button onPress={handleSubmit} mode="contained" style={{borderRadius:10, backgroundColor:"#06b6d4", marginTop:20 }}>
                <Text style={{ fontSize: 15, color: "white", alignSelf: "center" }}>Add trip</Text>
            </Button>
        </ScrollView>
    )
}

export default NewTrip