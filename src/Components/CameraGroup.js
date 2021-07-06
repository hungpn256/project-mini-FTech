import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar, Button, Card, Divider} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
export default function CameraGroup({cam, gallery}) {
  return (
    <View style={styles.actionBottom}>
      <Button
        style={styles.actionBtn}
        // icon="camera"
        color="#000"
        onPress={cam}>
        <Text style={styles.colorText}>
          <Entypo name="camera" size={18} color="#E74C3C" /> Camera
        </Text>
      </Button>
      <Button
        style={styles.actionBtn}
        // icon="folder-image"
        color="#000"
        onPress={gallery}>
        <Text style={styles.colorText}>
          <Entypo name="folder-images" size={18} color="#58D68D" /> Photo/Video
        </Text>
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
    color: '#555',
    fontWeight: '700',
    fontSize: 13,
  },
  actionBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: 'white',
    marginHorizontal: 5,
    paddingVertical: 5,
  },
});
