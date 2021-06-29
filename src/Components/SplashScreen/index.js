import React from 'react';
import {View, Text, Image} from 'react-native';
import {Styles} from './style';
import Logo from '../../../assets/Img/logo.png';
export default function Loading() {
  return (
    <View style={Styles.container}>
      <View
        style={{
          width: 140,
          height: 140,
          backgroundColor: '#1777F2',
          alignItems: 'center',
          borderRadius: 999,
          justifyContent: 'center',
          alignSelf: 'center',
          elevation: 5,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 80,
            color: '#fff',
            backgroundColor: 'transparent',
            borderRadius: 999,
          }}>
          F
        </Text>
      </View>

      <Text
        style={{
          fontSize: 16,
          fontStyle: 'italic',
          marginTop: 10,
          letterSpacing: 1,
          color: '#1777F2',
          fontWeight: 'bold',
        }}>
        Fsocial Media DHB
      </Text>
    </View>
  );
}
