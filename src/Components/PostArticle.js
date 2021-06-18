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
import ModalPost from './ModalPost';
import ModalCreatePost from '@Components/Modal';
import CameraGroup from './CameraGroup';
import {MODAL_CREATE_POST_IMG} from '../Screens/ModalCreatePost/contants';
import {useDispatch} from 'react-redux';
export default function PostArticle({editable}) {
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();

  const handlePress = () => {
    setStatus(false);
  };

  const delImg = () => {
    setImage(null);
  };
  const gallery = () => {
    console.log('image');
    launchImageLibrary({mediaType: 'photo'}, props => {
      if (props.type === 'image/jpeg') {
        dispatch({type: MODAL_CREATE_POST_IMG, payload: {img: props}});
      }
    });
  };

  const cam = async () => {
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
        launchCamera({mediaType: 'photo'}, props => {
          if (props.type === 'image/jpeg') {
            dispatch({type: MODAL_CREATE_POST_IMG, payload: {img: props}});
          }
        });
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <Card mode="outline" style={styles.container}>
      <View style={styles.inputWrapper}>
        <ModalPost />
      </View>
      <CameraGroup cam={cam} gallery={gallery} />
    </Card>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  inputWrapper: {
    paddingTop: 8,
    paddingBottom: 15,
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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  colorText: {
    color: '#696969',
    fontWeight: '700',
    fontSize: 13,
  },
  actionBtn: {
    paddingTop: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
  imageWrapper: {
    marginTop: 15,
    position: 'relative',
    height: 100,
    width: 100,
  },
  closeBtn: {
    padding: 5,
    borderRadius: 999,
    position: 'absolute',
    backgroundColor: '#f0f0f0',
    top: -5,
    right: 5,
  },
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});
