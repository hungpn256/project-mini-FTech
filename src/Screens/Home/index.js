import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import {Text, View} from 'react-native';
import { useDispatch } from 'react-redux';
import {LOGOUT} from '../Auth/constants'
const Home = () => {
  const dispatch = useDispatch()
  const handleLogout = () =>{
    dispatch({
      type:LOGOUT
    })
  }

  useEffect(()=>{
    const check = async()=>{    try {
      const keys = await AsyncStorage.getAllKeys();
      console.log('====================================');
      console.log(keys);
      console.log('====================================');
    } catch (error) {
      console.error(error)
    }}
    check()
  })
  
  return (
    <View>
      <Text onPress={handleLogout}>home</Text>
    </View>
  );
};

export default Home;
