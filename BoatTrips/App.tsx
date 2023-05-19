import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/actions/userAction';
import Main from './screen/Main';
import { Provider as PaperProvider } from 'react-native-paper'
import Toast from 'react-native-toast-message';

function App(): JSX.Element {

  useEffect(()=>{
    store.dispatch(loadUser())
  },[])

  return (
    <Provider store={store}>
      <PaperProvider>
        <Main />
        <Toast />
      </PaperProvider>
    </Provider>
  );
}

export default App;
