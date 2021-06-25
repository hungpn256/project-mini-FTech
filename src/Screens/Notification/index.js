import React from 'react';
import {Text, View} from 'react-native';
import Nothing from '../../Components/Nothing';
import Notification from '../../Components/Notification';

export default function NotificationScreen() {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: '700',
          padding: 10,
          borderBottomColor: 'rgba(0,0,0,0.1)',
          borderBottomWidth: 1,
        }}>
        Notification
      </Text>
      {/* <Nothing /> */}
      <Notification />
    </View>
  );
}
