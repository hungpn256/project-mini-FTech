import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {RECHARGE_MONEY, WALLET_CHANGE_STATE} from '../constaints';
import {useNavigation} from '@react-navigation/native';

function formatMoney(n, currency = '') {
  return currency + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

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
  console.log(money);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.textHeader}>
          Số dư tài khoản: {formatMoney(userMoney.money)} đ
        </Text>
        <TextInput
          placeholder="Nhập số tiền cần nạssp"
          keyboardType="numeric"
          style={styles.input}
          value={money}
          onChangeText={text => {
            setMoney(m => {
              try {
                let tmp = parseInt(text);
                console.log(tmp);
                if (isNaN(tmp) === true) return m;
                console.log('return ', isNaN(tmp));
                return tmp;
              } catch (e) {
                return m;
              }
            });
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
    flex: 1,
    alignItems: 'center',
    margin: '2%',
    borderRadius: 10,
  },

  input: {
    margin: '1%',
    width: '80%',
    borderWidth: 1,
    borderColor: '#ABB2B9',
    borderRadius: 10,
    paddingLeft: 20,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: '3%',
    color: '#1777F2',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  viewTouchableOpacity: {
    width: '25%',
    height: 50,
    marginTop: 10,
    borderRadius: 5,
    padding: 5,
    backgroundColor: '#1777F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Recharge;
