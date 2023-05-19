import { useEffect, useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { TextInput, Button } from "react-native-paper"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../redux/actions/userAction"
import Toast from 'react-native-toast-message';

const Login = ({navigation}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const [secure, setSecure] = useState(true)
    const { user, error } = useSelector(state=>state.auth)

    useEffect(()=>{
        if(error) {
            Toast.show({
                type: "error",
                text1: error
            })
        }
    },[dispatch, error])
    
    const loginHandler = () => {
        dispatch(login(email, password))
    }


    return (
        <View style={{marginHorizontal:12, flexDirection: "column", flex:1, justifyContent:"center", alignContent:"center"}}>
            <Text style={{color:"black", textAlign:"center", fontSize:25, fontWeight:500, marginBottom:10}}>Boat Trips</Text>
            <TextInput autoCapitalize='none' style={{marginTop:5, backgroundColor:"white"}} activeOutlineColor="#06b6d4" theme={{roundness:5}} label="Email" selectionColor="white" mode="outlined" value={email} onChangeText={(text) => setEmail(text)} />
            <TextInput autoCapitalize='none' secureTextEntry={secure} style={{ marginTop:5, backgroundColor:"white" }} activeOutlineColor="#06b6d4" theme={{roundness:5}} label="Password" selectionColor="white" mode="outlined" value={password} onChangeText={(text) => setPassword(text)} right={
                <TextInput.Icon icon={secure ? 'eye' : 'eye-off'} onPress={()=>setSecure(!secure)}/>
            }/>
            <Button onPress={loginHandler} mode="contained" style={{borderRadius:10, backgroundColor:"#06b6d4", marginTop:20 }}>
                <Text style={{ fontSize: 15, color: "white", alignSelf: "center" }}>Login</Text>
            </Button>

        </View>
    )
}

export default Login