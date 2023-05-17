import React, { useEffect, useState } from "react";
import { View, Text } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { TextInput, Button } from "react-native-paper"
import { UPDATE_PASSWORD_RESET } from "../redux/constants/userConstants";
import { updatePassword } from "../redux/actions/userAction";

const ChangePassword = ({ navigation }) => {

    const dispatch = useDispatch()
    const {error, isUpdated, loading} = useSelector(state => state.user)
    
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [oldSecure, setOldSecure] = useState(true)
    const [newSecure, setNewSecure] = useState(true)

    useEffect(()=> {

        if(error) {
            dispatch(clearErrors)
        }

        if(isUpdated) {

            navigation.navigate("Profile")

            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }

    },[dispatch, error, isUpdated])

    const submitHandler = () => {
    
        const formData = new FormData();
        formData.set('oldPassword', oldPassword)
        formData.set('password', password)

        dispatch(updatePassword(formData))
    }

    return(
        <View style={{marginHorizontal:12, flexDirection: "column"}}>
            <TextInput autoCapitalize='none' secureTextEntry={oldSecure} style={{ marginTop:5, backgroundColor:"white" }} activeOutlineColor="#06b6d4" theme={{roundness:5}} label="Old Password" selectionColor="white" mode="outlined" value={oldPassword} onChangeText={(text) => setOldPassword(text)} right={
                <TextInput.Icon icon={oldSecure ? 'eye' : 'eye-off'} onPress={()=>setOldSecure(!oldSecure)}/>
            }/>
             <TextInput autoCapitalize='none' secureTextEntry={newSecure} style={{ marginTop:5, backgroundColor:"white" }} activeOutlineColor="#06b6d4" theme={{roundness:5}} label="New Password" selectionColor="white" mode="outlined" value={password} onChangeText={(text) => setPassword(text)} right={
                <TextInput.Icon icon={newSecure ? 'eye' : 'eye-off'} onPress={()=>setNewSecure(!newSecure)}/>
            }/>
            <Button onPress={submitHandler} mode="contained" style={{borderRadius:10, backgroundColor:"#06b6d4", marginTop:20 }}>
                <Text style={{ fontSize: 15, color: "white", alignSelf: "center" }}>Change Password</Text>
            </Button>

        </View>
    )

}

export default ChangePassword