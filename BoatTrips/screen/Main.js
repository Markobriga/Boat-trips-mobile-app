import { useEffect } from "react"
import { useSelector } from "react-redux";
import Home from "./Home";
import Login from "./Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "./Splash";
import MyDrawer from "./MyDrawer";
const { NavigationContainer } = require("@react-navigation/native")

const Stack = createNativeStackNavigator();

const Main = () => {

    const { loading, isAuthenticated } = useSelector(state=>state.auth)

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {loading ? (
                    <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}/>
                ) : 
                isAuthenticated ? (
                    <Stack.Screen name="MyDrawer" component={MyDrawer} options={{ headerShown: false }}/>
                ) : (
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Main