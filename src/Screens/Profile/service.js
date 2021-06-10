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
