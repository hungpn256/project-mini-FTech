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
    firestore()
      .collection('room-chat')
      .add({
        users: payload.map(i => {
          return firestore().collection('user').doc(i);
        }),
        isTyping: false,
        messages: [],
        unread: [],
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(res => {
        payload.map(u => {
          firestore()
            .collection('user')
            .doc(u)
            .update({
              roomChatList: firestore.FieldValue.arrayUnion(res.id),
            })
            .then(() => {
              resolve({id: res.id});
            });
        });
      })
      .catch(e => {
        reject(e);
      });
  });

export const sendMes = payload =>
  new Promise((resolve, reject) => {
    firestore()
      .collection('room-chat')
      .doc(payload.roomId)
      .update({
        messages: firestore.FieldValue.arrayUnion({
          ...payload.messages[0],
          sent: true,
        }),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        resolve(true);
      })
      .catch(e => {
        reject(e);
      });
  });
export const markUnread = async payload => {
  console.log(payload, 'mark unread');
  const doc = await firestore().collection('room-chat').doc(payload.roomId);
  doc.update({
    unread: firestore.FieldValue.arrayUnion(payload.uid),
  });
};

export const markRead = async payload => {
  const doc = await firestore().collection('room-chat').doc(payload.roomId);
  doc.update({
    unread: firestore.FieldValue.arrayRemove(payload.uid),
  });
};
