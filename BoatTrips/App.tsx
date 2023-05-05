import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/actions/userAction';
import Main from './screen/Main';

function App(): JSX.Element {

  useEffect(()=>{
    store.dispatch(loadUser())
  },[])

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
