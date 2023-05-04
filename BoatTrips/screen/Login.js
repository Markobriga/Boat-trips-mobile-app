import { useEffect, useState } from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../redux/actions/userAction"

const Login = ({navigation}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    const { user, isAuthenticated } = useSelector(state=>state.auth)

    useEffect(()=>{
        console.log(user)
        if(isAuthenticated) {
            navigation.replace("Home")
        }
    },[dispatch, isAuthenticated])
    
    const loginHandler = () => {
        dispatch(login(email, password))
    }


    return (
        <View>
            <Text>Login</Text>
            <TextInput autoCapitalize='none' style={{color:"black", paddingLeft: 10, fontSize: 18, borderWidth: 1, marginBottom: 10, borderRadius: 15, paddingHorizontal: 4, borderColor: "grey", backgroundColor: "white", paddingVertical: 4 }} placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />
            <TextInput autoCapitalize='none' secureTextEntry={true} style={{ color:"black", paddingLeft: 10, fontSize: 18, borderWidth: 1, marginBottom: 10, borderRadius: 15, paddingHorizontal: 4, borderColor: "grey", backgroundColor: "white", paddingVertical: 4 }} placeholder="Lozinka" value={password} onChangeText={(text) => setPassword(text)} />
            <TouchableOpacity onPress={loginHandler} style={{ borderRadius: 15, backgroundColor: "dodgerblue", paddingVertical: 10, paddingHorizontal: 12, elevation: 10 }}>
                <Text style={{ fontSize: 15, color: "white", alignSelf: "center" }}>LOGIN</Text>
            </TouchableOpacity>

        </View>
    )
}

export default Login