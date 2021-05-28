import React from 'react';
import {Text, View} from 'react-native';
import { useDispatch } from 'react-redux';
import {LOGOUT} from '../Auth/constants'
const Home = () => {
  // const dispatch = useDispatch()
  // const handleLogout = () =>{
  //   dispatch({
  //     type:LOGOUT
  //   })
  // }
  return (
    <View>
      <Text>home</Text>
    </View>
  );
};

export default Home;
