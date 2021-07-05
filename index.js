/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);
export const db = SQLite.openDatabase(
  {name: 'cache'},
  () => {
    console.log('connected sqlite');
  },
  e => {
    console.log('connect sqlite error', e);
  },
);
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
