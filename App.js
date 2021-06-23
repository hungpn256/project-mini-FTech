import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import AppNavigation from './AppNaviGation';
import createStore from './src/Redux/storeConfigure';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
// import * as admin from 'firebase-admin';
import auth from '@react-native-firebase/auth';
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
  // useEffect(() => {
  // (async () => {
  //   const token = await messaging().getToken();
  //   console.log(token, 'token');
  // console.log(await auth().currentUser.getIdTokenResult().token, 'currentUser');
  // await admin.messaging().sendMulticast({
  //   tokens: [token], // ['token_1', 'token_2', ...]
  //   notification: {
  //     title: 'Basic Notification',
  //     body: 'This is a basic notification sent from the server!',
  //     imageUrl: 'https://my-cdn.com/app-logo.png',
  //   },
  // });
  // })();
  // messaging().onMessage(async remoteMessage => {
  //   console.log('A new FCM message arrived!', remoteMessage);
  // });
  // messaging().onNotificationOpenedApp(async remoteMessage => {
  //   console.log('onNotificationOpenedApp', remoteMessage);
  // });
  // messaging()
  //   .getInitialNotification()
  //   .then(remoteMessage => {
  //     if (remoteMessage) {
  //       console.log('noti', JSON.stringify(remoteMessage));
  //     }
  //   });
  // }, []);
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <AppNavigation />
      </PaperProvider>
    </Provider>
  );
}
export default App;
