import React from 'react';
import {View, Text, Image} from 'react-native';
import {Styles} from './style';
import Logo from '../../../assets/Img/logo.png';
export default function Loading() {
  return (
    <View style={Styles.container}>
      <Image style={Styles.Logo} source={Logo} />
    </View>
  );
}
