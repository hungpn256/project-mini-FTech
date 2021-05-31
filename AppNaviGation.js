import React, { useEffect,useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AuthStack from './src/Navigator/AuthStack'
import MainStack from './src/Navigator/MainStack'
import {CHECK} from './src/Screens/Auth/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from './src/Component/Loading/index'
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/Screens/Auth/Login';
import Home from './src/Screens/Home';
import Register from './src/Screens/Auth/Register';
import {Provider, useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Text, View, StyleSheet} from 'react-native';
import Profile from './src/Screens/Profile';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
export default function AppNavigator() {
  const isLogged = useSelector(state => state.auth.isLogged)
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(true)
  useEffect(()=>{
    const check = async ()=> {
      const data = await AsyncStorage.getItem("USER_ID")
      console.log("sadsadhjsakdjhsad"+data);
      if (data !== null) {
        dispatch({type:CHECK,payload:true})
        setLoading(false)
      }
      else{
        dispatch({type:CHECK,payload:false})
        setLoading(false)
      }
    }
    check()
  },[])

  return (
    loading ? (
      <>
        <Loading/>
      </>
    )
    :
    (
    <>
      {
      isLogged ?
        <MainStack/>
        :
        <AuthStack/>
      }
    </>
  )
  )
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
