import firestore from '@react-native-firebase/firestore';
export const getUser = async payload => {
  if (payload && payload.length === 0) return [];
  const user = await firestore()
    .collection('user')
    .where('id', 'in', payload)
    .get();
  return user.docs.map(u => ({id: u.id, ...u.data()}));
};
