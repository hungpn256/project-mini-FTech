import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '@react-native-firebase/auth';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Loading from './src/Components/Loading';
import AuthStack from './src/Navigator/AuthStack';
import MainStack from './src/Navigator/MainStack';
import {LOGOUT, USER_DEL, USER_SET} from './src/Screens/Auth/constants';
import ModalComponent from './src/Screens/Modal';
import ModalCreatePost from './src/Screens/ModalCreatePost';
import ModalPostConfig from './src/Screens/ModalPostConfig';
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
    // dispatch({type: LOGOUT});
    check();
  }, []);
  return load ? (
    <>
      <Loading />
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
