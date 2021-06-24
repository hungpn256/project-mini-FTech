import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
<<<<<<< HEAD
import {RECHARGE_MONEY} from '../constaints';
import {Alert} from 'react-native';
=======
import {RECHARGE_MONEY, WALLET_CHANGE_STATE} from '../constaints';
import {useNavigation} from '@react-navigation/native';
>>>>>>> 38f489d66aad9839e3c3a580f7a790d01e95c93a
const Recharge = () => {
  const navigation = useNavigation();
  const userMoney = useSelector(state => state.auth.user);
  const rechargeSuccess = useSelector(state => state.wallet.rechargeSuccess);
  const dispatch = useDispatch();
<<<<<<< HEAD
  const [money, setMoney] = useState('');
=======
  const [money, setMoney] = useState(0);
  useEffect(() => {
    if (rechargeSuccess) {
      navigation.goBack();
    }
    return () => {
      dispatch({type: WALLET_CHANGE_STATE, payload: {rechargeSuccess: false}});
    };
  }, [rechargeSuccess]);
>>>>>>> 38f489d66aad9839e3c3a580f7a790d01e95c93a
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>Số dư tài khoản: {userMoney.money} đ</Text>
        <TextInput
          placeholder="Nhập số tiền cần nạp"
          keyboardType="numeric"
          style={styles.input}
          value={Number(money)}
          onChangeText={text => {
            try {
              if (text.length > 0) setMoney(parseInt(text));
              else {
                setMoney(0);
              }
            } catch (e) {
              setMoney(0);
            }
          }}
        />
        <View style={styles.viewTouchableOpacity}>
          <TouchableOpacity
            onPress={() => {
              if (isNaN(money) === true || money < 0) {
                Alert.alert('Bạn nhập không đúng');
              } else {
                dispatch({type: RECHARGE_MONEY, payload: money});
              }
              // dispatch({type: WITHDRAW_MONEY, payload: money});
            }}>
            <Text style={styles.text}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 0.4,
    alignItems: 'center',
    margin: '2%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ABB2B9',
  },
  input: {
    margin: '1%',
    width: '80%',
    borderWidth: 1,
    borderColor: '#ABB2B9',
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
  },
  viewTouchableOpacity: {
    marginTop: 10,
    borderRadius: 5,
    borderColor: '#ABB2B9',
    borderWidth: 1,
    padding: 5,
  },
});
export default Recharge;
