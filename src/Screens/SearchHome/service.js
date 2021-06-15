import firestore from '@react-native-firebase/firestore';

export const search = async ({userSearch}) => {
  const users = [];
  try {
    const data = await firestore()
      .collection('user')
      .orderBy('name')
      .startAt(userSearch)
      .endAt(userSearch + '\uf8ff')
      .get();
    if (userSearch.length > 0) {
      data.forEach(user => {
        users.push(user.data());
      });
      return users;
    } else if (userSearch.length == 0) {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};
