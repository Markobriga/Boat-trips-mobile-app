import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadUser, updateProfile } from "../redux/actions/userAction"
import { UPDATE_PROFILE_RESET } from "../redux/constants/userConstants"
import { View, Text } from "react-native"
import { TextInput, Button } from "react-native-paper"


const EditProfile = ({ navigation }) => {

    const dispatch = useDispatch()
    const { user } = useSelector(state=>state.auth)
    const {error, isUpdated} = useSelector(state => state.user)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    useEffect(()=>{
        if(user) {
            setName(user.name)
            setEmail(user.email)
        } 
        if(error) {
            dispatch(clearErrors)
        }

        if(isUpdated) {
            dispatch(loadUser())

            navigation.navigate("Profile")

            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }
    },[dispatch, error, isUpdated])

    const submitHandler = () => {
    
        const formData = new FormData();
        formData.set('name', name)
        formData.set('email', email)

        dispatch(updateProfile(formData))
    }

    return (
        <View style={{marginHorizontal:12, flexDirection: "column"}}>
            <TextInput autoCapitalize="words" style={{marginTop:5, backgroundColor:"white"}} activeOutlineColor="#06b6d4" theme={{roundness:5}} label="Name" selectionColor="white" mode="outlined" value={name} onChangeText={(text) => setName(text)} />
            <TextInput autoCapitalize='none' style={{marginTop:5, backgroundColor:"white"}} activeOutlineColor="#06b6d4" theme={{roundness:5}} label="Email" selectionColor="white" mode="outlined" value={email} onChangeText={(text) => setEmail(text)} />
            <Button onPress={submitHandler} mode="contained" style={{borderRadius:10, backgroundColor:"#06b6d4", marginTop:20 }}>
                <Text style={{ fontSize: 15, color: "white", alignSelf: "center" }}>Update Profile</Text>
            </Button>

        </View>
    )

}

export default EditProfile