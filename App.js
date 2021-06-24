import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import AppNavigation from './AppNaviGation';
import createStore from './src/Redux/storeConfigure';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
// import * as admin from 'firebase-admin';
import auth from '@react-native-firebase/auth';
import NetInfo from '@react-native-community/netinfo';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

const store = createStore();
function App() {
  useEffect(() => {
    NetInfo.addEventListener(networkState => {
      console.log('Connection type - ', networkState.type);
      console.log('Is connected? - ', networkState.isConnected);
      if (!networkState.isConnected) {
        alert('please check your internet');
      }
    });
  }, []);
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <AppNavigation />
      </PaperProvider>
    </Provider>
  );
}
export default App;
