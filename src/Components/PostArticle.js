import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import {Avatar, Button, Card, Divider} from 'react-native-paper';
import InputEncloseAvatar from './InputEncloseAvatar';

export default function PostArticle({editable}) {
  return (
    <Card mode="outline" style={styles.container}>
      <View style={styles.inputWrapper}>
        <InputEncloseAvatar
          editable={false}
          placeholder="What's on your mind, Hung"
        />
      </View>
      <Divider style={{color: '#000'}} />
      <Card.Actions style={styles.actionBottom}>
        <Button
          style={styles.actionBtn}
          icon="camera"
          color="#777"
          onPress={e => {
            console.log('Camera');
          }}>
          <Text style={styles.colorText}>Camera</Text>
        </Button>
        <Button
          style={styles.actionBtn}
          icon="folder-image"
          color="#777"
          onPress={e => {
            console.log('image');
          }}>
          <Text style={styles.colorText}>Photo/Video</Text>
        </Button>
      </Card.Actions>
    </Card>
  );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    padding: 8,
  },
  inputWrapper: {
    paddingTop: 8,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginLeft: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  actionBottom: {
    justifyContent: 'space-around',
    paddingVertical: 0,
  },
  colorText: {
    color: '#000',
    height: '100%',
  },
  actionBtn: {
    paddingTop: 8,
  },
});
