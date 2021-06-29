import React, {useState} from 'react';
import {PermissionsAndroid, StyleSheet, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Card} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {MODAL_CREATE_POST_IMG} from '../Screens/ModalCreatePost/contants';
import CameraGroup from './CameraGroup';
import ModalPost from './ModalPost';
export default function PostArticle({}) {
  const dispatch = useDispatch();
  const gallery = () => {
    console.log('image');
    launchImageLibrary({mediaType: 'photo'}, props => {
      if (
        props.type === 'image/jpeg' ||
        props.type === 'image/png' ||
        props.type === 'image/jpg'
      ) {
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
<<<<<<< HEAD
          console.log(11111111111111);
          if (props.type === 'image/jpeg') {
=======
          if (
            props.type === 'image/jpeg' ||
            props.type === 'image/png' ||
            props.type === 'image/jpg'
          ) {
>>>>>>> 45d0d76f01654c50190eb208983998f3bef9837c
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
    marginBottom: 4,
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
