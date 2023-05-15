import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import Home from "./Home";
import Login from "./Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "./Splash";
import MyDrawer from "./MyDrawer";
import { getBoatByOwner } from "../redux/actions/boatAction";
import MakeAReservation from "./MakeAReservation";
import Reservations from "./Reservations";
const { NavigationContainer } = require("@react-navigation/native")

const Stack = createNativeStackNavigator();

const Main = () => {

    const { loading, isAuthenticated, user } = useSelector(state=>state.auth)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(user?.role === "owner") {
            dispatch(getBoatByOwner(user._id))
        }
        else if(user?.role === "booker") {   
            dispatch(getBoatByOwner(user.owner))
        }
    },[isAuthenticated])

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {loading ? (
                    <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}/>
                ) : 
                isAuthenticated ? (
                    <>
                        <Stack.Screen name="MyDrawer" component={MyDrawer} options={{ headerShown: false }}/>
                        <Stack.Screen name="Make a reservation" component={MakeAReservation} />
                        <Stack.Screen name="Reservations" component={Reservations} />
                    </>
                ) : (
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Main