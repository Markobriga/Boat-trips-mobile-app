import { View, Text } from "react-native"
import { useSelector } from "react-redux"
import { format } from 'date-fns'
import { Button } from "react-native-paper"

const Profile = ({navigation}) => {

    const { user } = useSelector(state=>state.auth)

    return (
        <View style={{marginHorizontal:10, marginTop:5}}>
            <Text style={{fontSize:18, color:"black"}}>Full Name:</Text>
            <Text style={{fontSize:18, color:"black", fontWeight:300, marginBottom:10}}>{user.name}</Text>
            <Text style={{fontSize:18, color:"black"}}>Email:</Text>
            <Text style={{fontSize:18, color:"black", fontWeight:300, marginBottom:10}}>{user.email}</Text>
            <Text style={{fontSize:18, color:"black"}}>Joined On:</Text>
            <Text style={{fontSize:18, color:"black", fontWeight:300, marginBottom:20}}>{format(new Date(user.createdAt), 'dd.MM.yyyy')}</Text>
            <View style={{flexDirection:"row", justifyContent:"space-around"}}>
                <Button onPress={()=>{navigation.navigate("Edit Profile")}} mode="elevated">Edit Profile</Button>
                <Button onPress={()=>{navigation.navigate("Change Password")}} mode="elevated">Change Password</Button>
            </View>
            
        </View>
    )
}

export default Profile