/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import messaging from '@react-native-firebase/messaging';
// import admin from 'firebase-admin';
// // Register background handler
// import serviceAccount from './src/Configs/serviceadmin.json'

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
// });

AppRegistry.registerComponent(appName, () => App);
