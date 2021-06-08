import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {Modal} from 'react-native';

export default function Loading({loading}) {
  return (
    <Modal visible={loading} transparent={true}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(255,255,255,0.6)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color="#232B2B" />
      </View>
    </Modal>
  );
}
