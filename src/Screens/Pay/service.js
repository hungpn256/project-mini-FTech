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
export const transfersMoney = async () => {};
export const withdrawMoney = async () => {};