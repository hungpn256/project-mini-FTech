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

export async function loginGoogle() {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();
  // console.log(firebase.auth().currentUser.uid);
  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  // await AsyncStorage.setItem("USER_ID",JSON.stringify(uid))
  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

export const login = async ({email, pass}) => {
  try {
    const res = await auth().signInWithEmailAndPassword(email, pass);
    if (res) {
      return true;
    }
  } catch (error) {
    CatchErr(error.code);
    console.log(error, 'err');
    return false;
  }
};

export const logout = async () => {
  try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await auth().signOut()
  } catch (error) {
    console.log(error);
  }
};
//thêm user vào databse sau khi đki thành công
const addUser = async (uid, fullName) => {
  try {
    return await firebase.firestore().collection('user').doc(uid).set({
      name: fullName,
      avatarUrl: '',
      backgroundUrl: '',
    });
  } catch (error) {
    console.log(error);
  }
};

export const register = async ({email, pass, name}) => {
  try {
    const res = await auth().createUserWithEmailAndPassword(email, pass);
    if (res) {
      const uid = firebase.auth().currentUser.uid;
      addUser(uid, name);
      return true;
    }
  } catch (error) {
    CatchErr(error.code);
    return false;
  }
};
