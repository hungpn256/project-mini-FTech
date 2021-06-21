import auth, {firebase} from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

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
  return user.data();
};

export async function loginGoogle() {
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();
  // console.log(firebase.auth().currentUser.uid);
  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  // await AsyncStorage.setItem("USER_ID",JSON.stringify(uid))
  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
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
  try {
    // if (GoogleSignin.getTokens) {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    // }
    await auth().signOut();
  } catch (error) {
    await auth().signOut();
    console.log(error);
  }
};
//thêm user vào databse sau khi đki thành công
const addUser = async (uid, fullName) => {
  let friend = [];
  let roomChat = [];
  let id = uid;
  let userName = fullName;
  let money = 0;
  let dob = '';
  let phoneNumber = '';
  let gender = -1;
  let messenger = '';
  const friendTmp = await firebase.firestore().collection('friend').add({
    accepted: friend,
    pending: friend,
  });

  try {
    return await firebase.firestore().collection('user').doc(uid).set({
      name: userName,
      id: id,
      avatar: '',
      background: '',
      friend: friendTmp,
      roomChatList: roomChat,
      money: money,
      gender: gender,
      dateOfBirth: dob,
      phoneNumber: phoneNumber,
      messenger: messenger,
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
