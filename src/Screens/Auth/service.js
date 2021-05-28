import auth, { firebase } from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore from '@react-native-firebase/firestore';

const CatchErr = (error) => {
  switch (error) {
    case 'auth/email-already-in-use':
      return alert('That email address is already in use!');
    case 'auth/invalid-email':
      return alert('That email address is invalid!');
    case 'auth/user-not-found':
      return alert('Account dont exist');
    default:
      break
  }
}

export const login = async ({email, pass}) =>{
  try {
      const res = await auth().signInWithEmailAndPassword(email,pass)
      if (res) {
        const uid = firebase.auth().currentUser.uid
        await AsyncStorage.setItem("USER_ID",JSON.stringify(uid))
        return true 
      }
  } catch (error) {
      CatchErr(error.code)
      return false
  }
}

export const logout = async () =>{
  try {
      await auth().signOut()
      await AsyncStorage.removeItem("USER_ID")
  } catch (error) {
      console.log(error);
  }
}
//thêm user vào databse sau khi đki thành công
const addUser = async(uid,fullName)=>{
  try {
    return await firebase.firestore()
    .collection('user')
    .doc(uid)
    .set({
      name: fullName,
      avatarUrl:"",
      backgroundUrl:""
    })
  } catch (error) {
    console.log(error);
  }
}

export const register = async ({email, pass,name}) => {
  try {
    const res = await auth().createUserWithEmailAndPassword(email,pass)
    if (res) {
      const uid = firebase.auth().currentUser.uid
      await AsyncStorage.setItem("USER_ID",JSON.stringify(uid))
      addUser(uid,name)
      return true 
    }
} catch (error) {
    CatchErr(error.code)
    return false
}
}

