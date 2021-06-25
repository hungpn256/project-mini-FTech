import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const addNoti = async payload => {
  const check = firestore()
    .collection('notification')
    .where('postId', '==', payload.postId)
    .where('type', '==', payload.type);
  const data = await check.get();
  const postCheck = await firestore()
    .collection('post')
    .doc(payload.postId)
    .get();
  const userPost = postCheck.data().userId;
  if (auth().currentUser.uid === userPost) {
    return;
  }
  if (data.docs.length > 0) {
    await firestore()
      .collection('notification')
      .doc(data.docs[0].id)
      .update({
        userId: firestore.FieldValue.arrayUnion(auth().currentUser.uid),
        updateAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
  } else {
    await firestore()
      .collection('notification')
      .add({
        type: payload.type,
        postId: payload.postId,
        userId: [auth().currentUser.uid],
        updateAt: firebase.firestore.FieldValue.serverTimestamp(),
        received: userPost,
      });
  }
};

export const getNoti = async () => {
  let res = await firestore()
    .collection('notification')
    .where('received', '==', auth().currentUser.uid)
    .get();
  res = res.docs.map(async item => {
    const user = await firestore().collection('user').doc(item.userId).get();
    return {...item, user: user.data()};
  });
  return res;
};
