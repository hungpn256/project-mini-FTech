import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  TextInput,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Avatar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import avatarImg from '../../../../assets/Img/avatar.jpg';
import {CLOSE_MODAL_USER, WALLET_TRANSFER} from '../constaints';
import FButton from '../../../Components/TouchOpacity/index';
export default function User() {
  const status = useSelector(state => state.wallet.modal);
  const user = useSelector(state => state.wallet.user);
  const currentUser = useSelector(state => state.auth.user);
  const {money} = currentUser;
  const [text, setText] = useState('');
  const [coin, setCoin] = useState('');
  const loading = useSelector(state => state.wallet.tranferSuccess);
  const dispatch = useDispatch();

  function formatMoney(n, currency = '') {
    return currency + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function formatNumber(n, currency = '') {
    // format number 1000000 to 1,234,567
    return (
      currency +
      n
        .toString()
        .replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    );
  }

  const handleSubmit = () => {
    console.log(coin + 'coin');
    if (!isNaN(parseInt(coin)) && parseInt(coin) > 0 && coin.length > 0) {
      if (parseInt(coin) > parseInt(currentUser.money)) {
        alert('You dont have enough money');
      } else {
        let moneySender = parseInt(currentUser.money) - parseInt(coin);
        dispatch({
          type: WALLET_TRANSFER,
          payload: {
            senderName: currentUser.name,
            received: user.id,
            sender: currentUser.id,
            moneySender: parseInt(moneySender),
            moneyReceived: parseInt(coin),
            content: text,
            token: user.token,
          },
        });
      }
      setCoin(0);
    } else {
      Alert.alert('Error', 'Invalid number');
    }
  };
  if (loading) {
    return (
      <Modal visible={loading}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(255,255,255,0.6)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color="#4169e1" />
        </View>
      </Modal>
    );
  }
  return (
    <Modal animationType="fade" visible={status}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>{user.name}'s info</Text>
          <Icon
            name="close"
            onPress={() => dispatch({type: CLOSE_MODAL_USER})}
            size={22}
            style={styles.closeModal}
          />
        </View>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.AvatarCmt}>
            {user.avatar ? (
              <View style={styles.avatar}>
                <Avatar.Image source={{uri: user.avatar}} size={40} />
              </View>
            ) : (
              <View style={styles.avatar}>
                <Avatar.Image source={avatarImg} size={40} />
              </View>
            )}
            <View style={styles.cmt}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={{marginLeft: 10}}>
                {user.email ? user.email : 'xx-xx-xx'}
              </Text>
            </View>
          </View>
          <View style={styles.money}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Money</Text>
            <Text style={{marginLeft: 5, color: '#696969'}}>
              {'('}Balance : {formatMoney(money)} {''}đ{')'}
            </Text>
          </View>
          <View
            style={{
              marginTop: -10,
              paddingHorizontal: 10,
              backgroundColor: '#fff',
            }}>
            <TextInput
              placeholderTextColor="#D35400"
              style={{color: '#D35400', fontSize: 30, fontWeight: 'bold'}}
              placeholder="0đ"
              keyboardType="numeric"
              value={'' + coin}
              onChangeText={e => setCoin(e)}
            />
          </View>
          <View
            style={{
              marginTop: 15,
              paddingHorizontal: 10,
              backgroundColor: '#fff',
              flex: 1,
            }}>
            <TextInput
              placeholderTextColor="rgba(0,0,0,0.54)"
              style={{
                color: 'rgba(0,0,0,0.54)',
                fontSize: 16,
                paddingVertical: 10,
              }}
              placeholder="Transaction content (optional)"
              multiline={true}
              numberOfLines={3}
              value={text}
              onChangeText={e => setText(e)}
            />
          </View>
          <View style={{paddingHorizontal: 10, marginVertical: 30}}>
            <FButton Name="Submit" handlePress={handleSubmit} />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEED',
  },
  avatar: {
    borderRadius: 999,
    borderColor: '#eee',
    borderWidth: 1,
  },
  cmt: {
    marginVertical: 10,
  },
  money: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  AvatarCmt: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  userName: {
    marginLeft: 10,
    color: 'black',
    fontSize: 16,
  },
  photoBtn: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hide: {
    display: 'none',
  },
  closeModal: {
    padding: 5,
    position: 'absolute',
    top: '50%',
    zIndex: 999,
    left: 0,
    marginLeft: 10,
  },
  img: {
    resizeMode: 'contain',
    flex: 1,
    width: 300,
    height: 300,
  },

  imgWrapper: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  inner: {
    position: 'relative',
    borderRadius: 15,
    padding: 20,
    flex: 1,
  },
  inputView: {
    flex: 1,
  },
  postGroup: {
    flex: 1,
  },
  header: {
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    position: 'relative',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#28313b',
  },
  textHeader: {
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
  },
  input: {
    borderRadius: 20,
    paddingVertical: 10,
    color: '#28313b',
  },
  actionBottom: {
    justifyContent: 'space-around',
  },
  colorText: {
    color: '#696969',
  },
  actionBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
  closeBtn: {
    padding: 5,
    borderRadius: 9999,
    position: 'absolute',
    backgroundColor: '#4169e1',
    top: -10,
    zIndex: 999,
    right: 4,
  },
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  viewModal: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
