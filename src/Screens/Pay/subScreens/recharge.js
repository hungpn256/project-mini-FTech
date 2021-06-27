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
import {RECHARGE_MONEY, WALLET_CHANGE_STATE} from '../constaints';
import {useNavigation} from '@react-navigation/native';
const Recharge = () => {
  const navigation = useNavigation();
  const userMoney = useSelector(state => state.auth.user);
  const rechargeSuccess = useSelector(state => state.wallet.rechargeSuccess);
  const dispatch = useDispatch();
  const [money, setMoney] = useState(0);
  useEffect(() => {
    if (rechargeSuccess) {
      navigation.goBack();
    }
    return () => {
      dispatch({type: WALLET_CHANGE_STATE, payload: {rechargeSuccess: false}});
    };
  }, [rechargeSuccess]);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.textHeader}>Số dư tài khoản: {userMoney.money} đ</Text>
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
  },

  content: {
    flex: 0.4,
    alignItems: 'center',
    margin: '2%',
    borderRadius: 10,
    backgroundColor: 'white',
  },

  input: {
    margin: '1%',
    width: '80%',
    borderWidth: 1,
    borderColor: '#ABB2B9',
    borderRadius: 10,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: '3%',
    color: '#4169e1',
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
