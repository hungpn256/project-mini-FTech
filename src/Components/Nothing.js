import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

const Nothing = () => {
  return (
    <View style={styles.container}>
      <Image
        style={{width: '100%', height: 300, resizeMode: 'contain'}}
        source={require('../Assets/empty.png')}
      />
    </View>
  );
};

export default Nothing;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
