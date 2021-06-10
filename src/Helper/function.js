import * as _ from 'lodash';
import storage from '@react-native-firebase/storage';
export const commonRoom = (user1, user2) => {
  if (user1.roomChatList && user2.roomChatList)
    return _.difference(
      user2.roomChatList,
      _.difference(user2.roomChatList, user1.roomChatList),
    );
  return [];
};

export const uploadImg = async image => {
  if (image) {
    const fileName = image.fileName;
    const ref = storage().ref('PostImg/' + fileName);
    try {
      await ref.putFile(image.uri);
      const url = await storage()
        .ref('PostImg/' + fileName)
        .getDownloadURL();
      return url;
    } catch (error) {
      console.log(error);
    }
  } else {
    return '';
  }
};

export const gallery = () => {
  launchImageLibrary({mediaType: 'photo'}, props => {
    if (props.type === 'image/jpeg') {
      setImage(props);
      setStatus(true);
    }
  });
};

export const camera = async () => {
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
          setImage(props);
          setStatus(true);
        }
      });
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
