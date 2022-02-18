import sqlite from 'react-native-sqlite-storage';

export const connectDb = () => {
  return new Promise((resolve, reject) => {
    const db = sqlite.openDatabase(
      {name: 'cache'},
      db_ => {
        console.log('connected sqlite');
        resolve(db);
      },
      e => {
        console.log('connect sqlite error', e);
        reject(e);
      },
    );
  });
};
