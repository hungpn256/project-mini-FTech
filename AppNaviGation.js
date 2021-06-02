import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Loading from './src/Components/Loading';

import AuthStack from './src/Navigator/AuthStack';
import MainStack from './src/Navigator/MainStack';
import {CHECK, USER_DEL, USER_SET} from './src/Screens/Auth/constants';
export default function AppNavigator() {
  const userData = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const load = useSelector(state => state.auth.splashScreen);

  const saveId = async uid => {
    await AsyncStorage.setItem('USER_ID', JSON.stringify(uid));
  };

  const removeId = async () => {
    await AsyncStorage.removeItem('USER_ID');
  };

  useEffect(() => {
    (() => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          console.log('?', firebase.auth().currentUser.uid);
          saveId(user.uid);
        } else {
          removeId();
          console.log('OUTTTTTT');
        }
      });
    })();
    const check = async () => {
      const data = await AsyncStorage.getItem('USER_ID');
      console.log('>>>?' + data);
      if (data !== null) {
        dispatch({type: USER_SET});
      } else {
        dispatch({type: USER_DEL});
      }
    };
    check();
  }, []);
  console.log('USER DATA' + userData);
  return load ? (
    <>
      <Loading />
    </>
  ) : (
    <>{userData ? <MainStack /> : <AuthStack />}</>
  );
}
