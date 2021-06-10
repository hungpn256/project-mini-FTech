import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar, Button, Card, Divider} from 'react-native-paper';
export default function CameraGroup({cam, gallery}) {
  return (
    <View style={styles.actionBottom}>
      <Button
        style={styles.actionBtn}
        icon="camera"
        color="#696969"
        onPress={cam}>
        <Text style={styles.colorText}>Camera</Text>
      </Button>
      <Button
        style={styles.actionBtn}
        icon="folder-image"
        color="#696969"
        onPress={gallery}>
        <Text style={styles.colorText}>Photo/Video</Text>
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  actionBottom: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 8,
  },
  colorText: {
    color: '#696969',
    fontWeight: '700',
    fontSize: 13,
  },
  actionBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    backgroundColor: 'white',
    marginHorizontal: 5,
    paddingVertical: 5,
  },
});
