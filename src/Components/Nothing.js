import React from 'react';
import {View, StyleSheet} from 'react-native';

const Nothing = () => {
  return <View style={styles.container}></View>;
};

export default Nothing;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
