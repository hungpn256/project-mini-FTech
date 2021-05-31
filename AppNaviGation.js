import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Loading from './src/Components/Loading';

import AuthStack from './src/Navigator/AuthStack';
import MainStack from './src/Navigator/MainStack';
import {CHECK} from './src/Screens/Auth/constants';
export default function AppNavigator() {
  const isLogged = useSelector(state => state.auth.isLogged);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
     (()=>{
      firebase.auth().onAuthStateChanged(async function(user) {
        if (user) {
          await AsyncStorage.setItem('USER_ID',JSON.stringify(user.uid));
        }
        else{
          await AsyncStorage.removeItem("USER_ID")
        }
      });
    })()
    const check = async () => {
      const data = await AsyncStorage.getItem('USER_ID');
      if (data !== null) {
        dispatch({type: CHECK, payload: true});
        setLoading(false);
      } else {
        dispatch({type: CHECK, payload: false});
        setLoading(false);
      }
    };
    check();
  }, []);

  return loading ? (
    <>
      <Loading />
    </>
  ) : (
    <>{isLogged ? <MainStack /> : <AuthStack />}</>
  );
}
