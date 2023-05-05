import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';
import Trips from './Trips';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
   return (
      <Drawer.Navigator>
         <Drawer.Screen name="Home" component={Home} />
         <Drawer.Screen name="Trips" component={Trips} />
      </Drawer.Navigator>
  
   )
}

export default MyDrawer