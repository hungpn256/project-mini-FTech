import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth, {firebase} from '@react-native-firebase/auth';

export const rechargeMoney = async valueMoney => {
  const user = await firestore().collection('user').doc(auth().currentUser.uid);
  const getUser = await user.get();
  const money = getUser.data().money;
  user.update({
    money: money + valueMoney,
  });
};

export const withdrawMoney = async valueMoney => {
  const user = await firestore().collection('user').doc(auth().currentUser.uid);
  const getUser = await user.get();
  const money = getUser.data().money;
  user.update({
    money: money - valueMoney,
  });
};
export const transfersMoney = async payload => {
  console.log(payload.moneyReceived + 'aloaloalo');
  await firestore()
    .collection('user')
    .doc(payload.sender)
    .update({
      money: parseInt(payload.moneySender),
    });
};

export const received = async payload => {
  const money = await firestore()
    .collection('user')
    .doc(payload.received)
    .get();
  const mon = parseInt(money.data().money);
  await firestore()
    .collection('user')
    .doc(payload.received)
    .update({
      money: mon + parseInt(payload.moneyReceived),
    });
};

export const getUsers = async () => {
  const users = [];
  const data = await firestore().collection('user').get();
  data.forEach(item => {
    users.push(item.data());
  });
  return users;
};
