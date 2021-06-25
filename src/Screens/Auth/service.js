import auth, {firebase} from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';
GoogleSignin.configure({
  webClientId:
    '49605558541-dqv3864n6hm810foab2v8p4rpabpm97f.apps.googleusercontent.com',
});

const CatchErr = error => {
  switch (error) {
    case 'auth/email-already-in-use':
      return alert('That email address is already in use!');
    case 'auth/invalid-email':
      return alert('That email address is invalid!');
    case 'auth/user-not-found':
      return alert('Account dont exist');
    case 'auth/wrong-password':
      return alert('Wrong password');
    default:
      break;
  }
};

export const userDocument = async () => {
  const id = firebase.auth().currentUser.uid;
  const user = await firestore().collection('user').doc(id).get();
  return {id, ...user.data()};
};

const saveUser = async uid => {
  const user = await firestore().collection('user').doc(uid).get();
  saveToken();
  return user.data();
};

export const saveToken = async () => {
  const token = await messaging().getToken();
  firestore()
    .collection('user')
    .doc(auth().currentUser.uid)
    .update({
      token: firestore.FieldValue.arrayUnion(token),
    });
};

export async function loginGoogle() {
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();
  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  await auth().signInWithCredential(googleCredential);
  console.log(auth().currentUser);
  const data = await firestore()
    .collection('user')
    .doc(auth().currentUser.uid)
    .get();
  if (!data.data()) {
    await addUser(
      auth().currentUser.uid,
      auth().currentUser.displayName,
      auth().currentUser.photoURL,
      auth().currentUser.phoneNumber,
    );
  }
  return saveUser(auth().currentUser.uid);
}

export const login = async ({email, pass}) => {
  try {
    await auth().signInWithEmailAndPassword(email, pass);
    return saveUser(firebase.auth().currentUser.uid);
  } catch (error) {
    CatchErr(error.code);
    return null;
  }
};

export const logout = async () => {
  const token = await messaging().getToken();
  try {
    // if (GoogleSignin.getTokens) {
    firestore()
      .collection('user')
      .doc(auth().currentUser.uid)
      .update({
        token: firestore.FieldValue.arrayRemove(token),
      });
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    // }

    await auth().signOut();
  } catch (error) {
    firestore()
      .collection('user')
      .doc(auth().currentUser.uid)
      .update({
        token: firestore.FieldValue.arrayRemove(token),
      });
    await auth().signOut();
    console.log(error);
  }
};
//thêm user vào databse sau khi đki thành công
const addUser = async (uid, fullName, avatar = '', phone = '') => {
  let friend = [];
  let roomChat = [];
  let id = uid;
  let userName = fullName;
  let money = 0;
  let dob = '';
  let phoneNumber = phone || '';
  let gender = -1;
  let messenger = '';
  const friendTmp = await firebase.firestore().collection('friend').add({
    accepted: friend,
    pending: friend,
  });

  try {
    return await firebase
      .firestore()
      .collection('user')
      .doc(uid)
      .set({
        name: userName,
        id: id,
        avatar: avatar || '',
        background: '',
        friend: friendTmp,
        roomChatList: roomChat,
        money: money,
        gender: gender,
        dateOfBirth: dob,
        phoneNumber: phoneNumber,
        messenger: messenger,
        email: auth().currentUser.email,
      });
  } catch (error) {
    console.log(error);
  }
};

export const register = async ({email, pass, name}) => {
  try {
    await auth().createUserWithEmailAndPassword(email, pass);
    const uid = firebase.auth().currentUser.uid;
    await addUser(uid, name);
    return saveUser(firebase.auth().currentUser.uid);
  } catch (error) {
    CatchErr(error.code);
    return null;
  }
};
