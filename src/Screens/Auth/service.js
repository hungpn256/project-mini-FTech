import auth from '@react-native-firebase/auth';

export const login = ({username, password}) =>
  new Promise((resolve, reject) => {
    auth()
      .signInWithEmailAndPassword(username, password)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          reject('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          reject('That email address is invalid!');
        }
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
        if (error.code === 'auth/email-already-in-use') {
          reject('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          reject('That email address is invalid!');
        }
      });
  });
