import {firebase} from '@react-native-firebase/auth';
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
            if (result.length > 10) resolve(result);
            result.push(item);
          }
        });
        resolve(result);
      })
      .catch(e => {
        reject(e);
      });
  });
export const getConversation = payload =>
  new Promise((resolve, reject) => {
    firestore()
      .collection('room-chat')
      .doc(payload)
      .get()
      .then(res => {
        resolve({id: payload, ...res.data()});
      })
      .catch(e => {
        reject(e);
      });
  });

export const createConversation = payload =>
  new Promise((resolve, reject) => {
    console.log(payload, 'payload');
    firestore()
      .collection('room-chat')
      .add({
        users: payload,
        isTyping: false,
        messages: [],
        updateAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(res => {
        console.log(res, 'resss');
        payload.map(u => {
          console.log(u.id, 'iduser');
          firestore()
            .collection('user')
            .doc(u.id)
            .get()
            .then(resUSer => {
              console.log(resUSer.data());
              firestore()
                .collection('user')
                .doc(u.id)
                .update({
                  roomChatList: [...resUSer.data().roomChatList, res.id],
                });
            });
        });
        resolve({id: res.id});
      })
      .catch(e => {
        reject(e);
      });
  });

export const sendMes = payload =>
  new Promise((resolve, reject) => {
    console.log(payload.messages, 'sendMes');
    firestore()
      .collection('room-chat')
      .doc(payload.roomId)
      .update({
        messages: firestore.FieldValue.arrayUnion(payload.messages[0]),
      })
      // .get()
      .then(() => {
        console.log('data');
      });
  });
