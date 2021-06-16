import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
export const getProfile = payload =>
  new Promise((resolve, reject) => {
    firestore()
      .collection('user')
      .doc(payload)
      .get()
      .then(doc => {
        resolve({id: doc.id, ...doc.data()});
      });
  });

export const updateMe = payload =>
  new Promise((resolve, reject) => {
    firestore()
      .collection('user')
      .doc(auth().currentUser.uid)
      .update({...payload})
      .then(() => {
        resolve();
      });
  });
export const getPostMe = payload =>
  new Promise((resolve, reject) => {
    firestore()
      .collection('post')
      .where('userId', '==', payload)
      .orderBy('createAt', 'desc')
      .get()
      .then(res => {
        console.log('res', res.docs);
        const tmp = res.docs.map(item => {
          return {id: item.id, ...item.data()};
        });
        resolve(tmp);
      })
      .catch(e => {
        reject(e);
      });
  });
export const addFriend = async payload => {
  console.log(payload, 'payload');
  firestore()
    .collection('friend')
    .doc(payload.friendIdPartner)
    .update({
      pending: firestore.FieldValue.arrayUnion(auth().currentUser.uid),
    });
};
export const removeFriend = async payload => {
  firestore()
    .collection('friend')
    .doc(payload.friendIdPartner)
    .update({
      pending: firestore.FieldValue.arrayRemove(auth().currentUser.uid),
      accepted: firestore.FieldValue.arrayRemove(auth().currentUser.uid),
    });
  firestore()
    .collection('friend')
    .doc(payload.friendId)
    .update({
      accepted: firestore.FieldValue.arrayRemove(payload.id),
    });
};
export const acceptFriend = async payload => {
  firestore()
    .collection('friend')
    .doc(payload.friendIdPartner)
    .update({
      accepted: firestore.FieldValue.arrayUnion(auth().currentUser.uid),
    });
  firestore()
    .collection('friend')
    .doc(payload.friendId)
    .update({
      accepted: firestore.FieldValue.arrayUnion(payload.id),
      pending: firestore.FieldValue.arrayRemove(payload.id),
    });
};
