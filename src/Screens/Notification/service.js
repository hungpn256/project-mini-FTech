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
        unread: true,
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
        unread: true,
      });
  }
};

export const getNoti = async () => {
  let noti = await firestore()
    .collection('notification')
    .where('received', '==', auth().currentUser.uid)
    .orderBy('updateAt', 'desc')
    .get();
  let res = [];
  for (let i = 0; i < noti.size; i++) {
    let users = [];
    const data = noti.docs[i].data();
    const usersFirebase = data.userId.slice(-2);
    for (let j = usersFirebase.length - 1; j >= 0; j--) {
      const user = await firestore()
        .collection('user')
        .doc(usersFirebase[j])
        .get();
      users.push(user.data());
    }
    const post = await firestore().collection('post').doc(data.postId).get();
    res.push({id: noti.docs[i].id, ...data, users, post: post.data()});
  }
  return res;
};

export const markReadNoti = payload => {
  return firestore()
    .collection('notification')
    .doc(payload)
    .update({unread: false});
};
