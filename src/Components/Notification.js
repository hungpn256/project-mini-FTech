import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Avatar} from 'react-native-paper';
import {avatarDefault} from '../index_Constant';

export default function Notification() {
  return (
    <View style={styles.container}>
      <Avatar.Image source={{uri: avatarDefault}} size={80} />
      <View style={styles.content}>
        <Text style={styles.text}>
          <Text style={styles.name}>Phạm Năng Hưng</Text> đã like ảnh của bạn
        </Text>
      </View>
      <Text style={styles.time}>12h ago</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  content: {
    marginTop: 4,
  },
  text: {
    fontSize: 16,
  },
  name: {
    fontWeight: '700',
  },
  time: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    color: '#777',
  },
});
