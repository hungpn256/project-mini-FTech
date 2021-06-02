import firestore from '@react-native-firebase/firestore';
export const getUserByName = payload =>
  new Promise((resolve, reject) => {
    firestore()
      .collection('user')
      .get()
      .then(querySnapshot => {
        let resultAll = [];
        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
          resultAll.push({id: documentSnapshot.id, ...documentSnapshot.data()});
        });
        let result = [];
        resultAll.forEach(item => {
          if (
            item.name.toLowerCase().match(new RegExp(payload.toLowerCase()))
          ) {
            result.push(item);
          }
        });
        resolve(result);
      })
      .catch(e => {
        reject(e);
      });
  });
