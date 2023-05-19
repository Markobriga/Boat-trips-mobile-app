import React, { useState, useEffect } from "react";
import { View, Text } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { TextInput, Button } from "react-native-paper"
import { registerBooker } from "../redux/actions/userAction";
import Toast from 'react-native-toast-message';
import { REGISTER_BOOKER_RESET } from "../redux/constants/userConstants"

const NewBooker = ({navigation}) => {

    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [secure, setSecure] = useState(true)

    const { user } = useSelector(state=>state.auth)
    const { user:booker, error } = useSelector(state=>state.user)

    useEffect(()=>{
        if(booker) {
            Toast.show({
                type: "success",
                text1: "Added new booker"
            })
            dispatch({type: REGISTER_BOOKER_RESET})
            navigation.navigate("MyDrawer")
        }
        if(error) {
            Toast.show({
                type: "error",
                text1:error
            })
        }
    },[dispatch, booker, error])

    const handleSubmit = () => {
        const formData = new FormData()

        formData.set("name", name)
        formData.set("email", email)
        formData.set("password", password)
        formData.set("owner", user._id)

        dispatch(registerBooker(formData))
        
    }

    return (
        <View style={{marginHorizontal:12, flexDirection: "column"}}>
            <TextInput autoCapitalize="words" style={{marginTop:5, backgroundColor:"white"}} activeOutlineColor="#06b6d4" theme={{roundness:5}} label="Name" selectionColor="white" mode="outlined" value={name} onChangeText={(text) => setName(text)} />
            <TextInput autoCapitalize='none' style={{marginTop:5, backgroundColor:"white"}} activeOutlineColor="#06b6d4" theme={{roundness:5}} label="Email" selectionColor="white" mode="outlined" value={email} onChangeText={(text) => setEmail(text)} />
            <TextInput autoCapitalize='none' secureTextEntry={secure} style={{ marginTop:5, backgroundColor:"white" }} activeOutlineColor="#06b6d4" theme={{roundness:5}} label="Password" selectionColor="white" mode="outlined" value={password} onChangeText={(text) => setPassword(text)} right={
                <TextInput.Icon icon={secure ? 'eye' : 'eye-off'} onPress={()=>setSecure(!secure)}/>
            }/>
            <Button onPress={handleSubmit} mode="contained" style={{borderRadius:10, backgroundColor:"#06b6d4", marginTop:20 }}>
                <Text style={{ fontSize: 15, color: "white", alignSelf: "center" }}>Register</Text>
            </Button>

        </View>
    )
}

export default NewBooker