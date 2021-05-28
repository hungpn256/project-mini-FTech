import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Decor() {
  return (
    <View style={style.decor}>
      <View style={style.left}></View>
      <Text style={style.text}>or</Text>
      <View style={style.right}></View>
    </View>
  );
}

const style = StyleSheet.create({
  decor: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    marginTop: 40,
  },
  text: {
    fontSize: 16,
    margin: 5,
    color: 'white',
  },
  left: {
    backgroundColor: 'white',
    height: 1,
    width: 130,
  },
  right: {
    backgroundColor: 'white',
    height: 1,
    width: 130,
  },
});
