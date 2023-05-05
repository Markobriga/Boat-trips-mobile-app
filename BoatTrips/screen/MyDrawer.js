import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { Text, TouchableOpacity, View} from "react-native"
import Home from './Home';
import Trips from './Trips';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/userAction';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {

   const dispatch = useDispatch()
   const { user } = useSelector(state => state.auth)

   const logoutHandler = () => {
      dispatch(logout())
   }

   return (
      <DrawerContentScrollView {...props} safeArea>
         <View style={{paddingHorizontal:10, paddingVertical:10}}>
            <Text style={{color:"black"}}>Hi, {user.name}</Text>
         </View>
         <TouchableOpacity style={{marginHorizontal:10}} onPress={logoutHandler}>
            <Text style={{color:"black", fontWeight:500}}>Logout</Text>
         </TouchableOpacity>
         <View style={{borderWidth:0.5, marginTop:10, marginHorizontal:10}}></View>
         <View>
            {props.state.routeNames.map((name, index) => (
               <View style={[index === props.state.index ? {paddingHorizontal:5, marginHorizontal:5, paddingVertical:5, marginVertical:5, borderRadius:10, backgroundColor:"#ecfeff"} : {paddingHorizontal:10, paddingVertical:10}]}>
                  <TouchableOpacity  onPress={(event)=> {
                     props.navigation.navigate(name)
                  }}>
                     <Text style={[index === props.state.index ? {color: "#06b6d4", fontSize:22, fontWeight:500} : {color: "black", fontSize:22, fontWeight:500}]}>
                        {name}
                     </Text>
                  </TouchableOpacity>
               </View>
            ))}
         </View>
      </DrawerContentScrollView>
   )
}

const MyDrawer = () => {
   return (
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
         <Drawer.Screen name="Home" component={Home} />
         <Drawer.Screen name="Trips" component={Trips} />
      </Drawer.Navigator>
  
   )
}

export default MyDrawer