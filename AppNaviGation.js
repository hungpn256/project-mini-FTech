import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Loading from './src/Components/SplashScreen/index';
import NoInternetModal from './src/Components/NoInternetModal';
import AuthStack from './src/Navigator/AuthStack';
import MainStack from './src/Navigator/MainStack';
import {USER_DEL, USER_SET} from './src/Screens/Auth/constants';
import ModalComponent from './src/Screens/Modal';
import ModalCreatePost from './src/Screens/ModalCreatePost';
import ModalPostConfig from './src/Screens/ModalPostConfig';
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);
export default function AppNavigator() {
  const userData = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const load = useSelector(state => state.auth.splashScreen);
  const [loadDb, setLoadDb] = useState(false);
  const saveId = async uid => {
    const token = await messaging().getToken();
    console.log(token + 'TOKEN');
    await AsyncStorage.setItem('USER_ID', JSON.stringify(uid));
  };

  const removeId = async () => {
    await AsyncStorage.removeItem('USER_ID');
  };

  useEffect(() => {
    (() => {
      auth().onAuthStateChanged(function (user) {
        if (user) {
          saveId(user.uid);
        } else {
          removeId();
        }
      });
    })();
    const check = async () => {
      const data = await AsyncStorage.getItem('USER_ID');
      if (data !== null) {
        dispatch({type: USER_SET});
      } else {
        dispatch({type: USER_DEL});
      }
    };
    check();
    const db = SQLite.openDatabase(
      {name: 'FTechProject', location: 'default'},
      () => {
        setLoadDb(true);
        console.log('connected sqlite');
      },
      e => {
        setLoadDb(false);
        console.log('connect sqlite error', e);
      },
    );
    if (loadDb) {
      db.transaction(tx => {
        tx.executeSql(
          " INSERT INTO User (id,avatar,background,gender,email,name,money,phoneNumber,dateOfBirth) VALUES ('" +
            userData.id +
            "','" +
            userData.avatar +
            "','" +
            userData.background +
            "'," +
            userData.gender +
            ",'" +
            userData.email +
            "','" +
            userData.name +
            "'," +
            userData.money +
            ',' +
            userData.phoneNumber +
            ",'" +
            userData.dateOfBirth +
            "',) ",
        );
      });
    }
    // dispatch({type: LOGOUT});
  }, []);
  const [isOffline, setOfflineStatus] = useState(false);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
      console.log('sdasd', offline);
    });
    return () => removeNetInfoSubscription();
  }, []);
  const fetchUsers = useCallback(() => {
    setLoading(true);
    firestore()
      .collection('user')
      .get()
      .then(() => {
        isOffline && setOfflineStatus(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isOffline]);
  return load || isOffline ? (
    <>
      <Loading />
      {isOffline && (
        <NoInternetModal
          show={isOffline}
          onRetry={fetchUsers}
          isRetrying={isLoading}
        />
      )}
    </>
  ) : (
    <>
      {userData ? (
        <>
          <ModalCreatePost />
          <ModalPostConfig />
          <MainStack />
          <ModalComponent />
        </>
      ) : (
        <AuthStack />
      )}
    </>
  );
}
