import React, { useEffect,useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AuthStack from './src/Navigator/AuthStack'
import MainStack from './src/Navigator/MainStack'
import {CHECK} from './src/Screens/Auth/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from './src/Component/Loading/index'
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
