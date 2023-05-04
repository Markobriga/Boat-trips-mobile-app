import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import Home from './screen/Home';
import Login from './screen/Login';
import store from './redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadUser } from './redux/actions/userAction';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {

  useEffect(()=>{
    store.dispatch(loadUser())
  },[])

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
