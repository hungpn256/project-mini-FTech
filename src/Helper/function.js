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
    console.log('1234353248734' + image);
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
    console.log(image.uri);
  } else {
    return '';
  }
};
