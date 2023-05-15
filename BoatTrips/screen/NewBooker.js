import React, { useState } from "react";
import { View, Text } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { TextInput, Button } from "react-native-paper"
import { registerBooker } from "../redux/actions/userAction";

const NewBooker = ({navigation}) => {

    const dispatch = useDispatch()

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [secure, setSecure] = useState(true)

    const { user } = useSelector(state=>state.auth)

    const handleSubmit = () => {
        const formData = new FormData()

        formData.set("name", name)
        formData.set("email", email)
        formData.set("password", password)
        formData.set("owner", user._id)

        dispatch(registerBooker(formData))
        navigation.navigate("MyDrawer")
    }

    return (
        <View style={{marginHorizontal:12, flexDirection: "column"}}>
            <TextInput autoCapitalize='yes' style={{marginTop:5, backgroundColor:"white"}} activeOutlineColor="#06b6d4" theme={{roundness:5}} label="Name" selectionColor="white" mode="outlined" value={name} onChangeText={(text) => setName(text)} />
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