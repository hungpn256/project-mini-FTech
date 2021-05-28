import auth from '@react-native-firebase/auth';

export const login = ({username, password}) =>
  new Promise((resolve, reject) => {
    auth()
      .signInWithEmailAndPassword(username, password)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
export const register = ({username, password}) =>
  new Promise((resolve, reject) => {
    auth()
      .createUserWithEmailAndPassword(username, password)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
