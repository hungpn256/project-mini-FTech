import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  PermissionsAndroid,
} from 'react-native';
import {Avatar, Button, Card, Divider} from 'react-native-paper';
import InputEncloseAvatar from './InputEncloseAvatar';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function PostArticle({editable}) {
  const [image, setImage] = useState(null);
  return (
    <Card mode="outline" style={styles.container}>
      <View style={styles.inputWrapper}>
        <InputEncloseAvatar
          editable={false}
          placeholder="What's on your mind, Hung"
        />
        {image && (
          <View style={styles.imageWrapper}>
            <Image style={styles.image} source={image} />
          </View>
        )}
      </View>
      <Card.Actions style={styles.actionBottom}>
        <Button
          style={styles.actionBtn}
          icon="camera"
          color="#777"
          onPress={async e => {
            console.log('Camera');
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                  title: 'App Camera Permission',
                  message: 'App needs access to your camera ',
                  buttonNeutral: 'Ask Me Later',
                  buttonNegative: 'Cancel',
                  buttonPositive: 'OK',
                },
              );
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Camera permission given');
                launchCamera({mediaType: 'photo'}, props => {
                  if (props.type === 'image/jpeg') {
                    setImage(props);
                  }
                });
              } else {
                console.log('Camera permission denied');
              }
            } catch (err) {
              console.warn(err);
            }
          }}>
          <Text style={styles.colorText}>Camera</Text>
        </Button>
        <Button
          style={styles.actionBtn}
          icon="folder-image"
          color="#777"
          onPress={async e => {
            console.log('image');
            launchImageLibrary({mediaType: 'photo'}, props => {
              if (props.type === 'image/jpeg') {
                setImage(props);
              }
            });
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
  imageWrapper: {
    height: 100,
    width: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 1,
    elevation: 2,
  },
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});
