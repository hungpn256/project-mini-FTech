import firestore from '@react-native-firebase/firestore';
export const getUser = async payload => {
  const user = await firestore().collection('user').doc(payload).get();
  return {id: user.id, ...user.data()};
};
