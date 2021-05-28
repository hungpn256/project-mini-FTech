import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Loading from './src/Component/Loading/index';
import AuthStack from './src/Navigator/AuthStack';
import MainStack from './src/Navigator/MainStack';
import {CHECK} from './src/Screens/Auth/constants';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
export default function AppNavigator() {
  const isLogged = useSelector(state => state.auth.isLogged);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
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
const styles = StyleSheet.create({
  tabBottom: {
    width: '90%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBottomFocus: color => ({
    borderColor: color,
    borderTopWidth: 4,
  }),
});
