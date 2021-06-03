import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const Notification = () => {
  return (
    <View>
      <View style={styles.view}>
        <Entypo name="bell" size={30} />
        <Text style={styles.text}></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    backgroundColor: '#D6EAF8',
    borderRadius: 5,
    height: '25%',
    flexDirection: 'row',
  },
  text: {},
});
export default Notification;
