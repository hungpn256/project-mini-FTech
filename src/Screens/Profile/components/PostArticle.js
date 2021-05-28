import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import {Avatar, Button, Card, Divider} from 'react-native-paper';

export default function PostArticle({editable}) {
  return (
    <Card elevation={3} mode="elevated" style={styles.container}>
      <View style={styles.inputWrapper}>
        <Avatar.Image
          size={40}
          source={{
            uri: 'https://scontent.fhan4-1.fna.fbcdn.net/v/t1.6435-1/p160x160/69198146_1346843938816773_7149406761399615488_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=7206a8&_nc_ohc=T2HIPc3q7xIAX_ZdU2e&_nc_ht=scontent.fhan4-1.fna&tp=6&oh=1d695792abaf91545e01681f2983b0f6&oe=60C319FF',
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="What's on your mind, Hung"
          editable={editable}
          multiline={true}
        />
      </View>
      <Divider style={{color: '#000'}} />
      <Card.Actions style={styles.actionBottom}>
        <Button
          icon="camera"
          color="#777"
          onPress={e => {
            console.log('Camera');
          }}>
          <Text style={styles.colorText}>Camera</Text>
        </Button>
        <Button
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginLeft: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  actionBottom: {
    justifyContent: 'space-around',
  },
  colorText: {
    color: '#000',
  },
});
