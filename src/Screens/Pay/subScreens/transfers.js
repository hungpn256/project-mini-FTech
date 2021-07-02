import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {ALL_USER_WALLET, WITHDRAW_MONEY} from '../constaints';
import avatarImg from '../../../../assets/Img/avatar.png';
import User from './Modal';
import {OPEN_MODAL_USER} from '../constaints';

const handleMoney = (surplus, inputNumber) => {
  if (surplus >= inputNumber) {
    dispatch({type: WITHDRAW_MONEY, payload: inputNumber});
  } else {
    alert('Số dư ví không đủ');
  }
};
const Transfers = () => {
  const userMoney = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const [money, setMoney] = useState(0);
  const [receiver, setReceiver] = useState('');
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('');
  const allUser = useSelector(state => state.wallet.users);

  useEffect(() => {
    dispatch({type: ALL_USER_WALLET});
  }, []);

  useEffect(() => {
    search();
  }, [text]);

  const search = () => {
    const data = allUser.filter(
      item =>
        item.name.toLowerCase().match(text.toLowerCase()) ||
        item.email?.toLowerCase().match(text.toLowerCase()),
    );
    setFilter(data);
  };
  return (
    <View style={styles.container}>
      <User />
      <View style={styles.inputGroup}>
        <TextInput
          onChangeText={e => setText(e)}
          style={styles.textInput}
          value={text}
          placeholder="Name"
        />
      </View>
      <View style={{paddingHorizontal: 8, marginTop: 10}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {filter.length > 0 ? (
            filter.map((item, i) => {
              return (
                <View key={item.id}>
                  <Pressable
                    onPress={() =>
                      dispatch({type: OPEN_MODAL_USER, payload: {item: item}})
                    }
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    {item.avatar ? (
                      <Pressable>
                        <View style={styles.avatar}>
                          <Avatar.Image source={{uri: item.avatar}} size={45} />
                        </View>
                      </Pressable>
                    ) : (
                      <Pressable>
                        <View style={styles.avatar}>
                          <Avatar.Image source={avatarImg} size={45} />
                        </View>
                      </Pressable>
                    )}
                    <View style={{flexDirection: 'column'}}>
                      <Text style={styles.userName}>{item.name}</Text>
                      <Text style={styles.userName}>
                        {item.email ? item.email : 'xx-xx-xx'}
                      </Text>
                    </View>
                  </Pressable>
                  <View
                    key={i}
                    style={{
                      borderBottomColor: '#eee',
                      borderBottomWidth: 1,
                      marginTop: 5,
                    }}></View>
                </View>
              );
            })
          ) : (
            <>
              {allUser
                ? allUser.map((item, i) => {
                    return (
                      <View key={item.id}>
                        <Pressable
                          onPress={() =>
                            dispatch({
                              type: OPEN_MODAL_USER,
                              payload: {item: item},
                            })
                          }
                          style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          {item.avatar ? (
                            <Pressable>
                              <View style={styles.avatar}>
                                <Avatar.Image
                                  source={{uri: item.avatar}}
                                  size={45}
                                />
                              </View>
                            </Pressable>
                          ) : (
                            <Pressable>
                              <View style={styles.avatar}>
                                <Avatar.Image source={avatarImg} size={45} />
                              </View>
                            </Pressable>
                          )}
                          <View style={{flexDirection: 'column'}}>
                            <Text style={styles.userName}>{item.name}</Text>
                            <Text style={styles.userName}>
                              {item.email ? item.email : 'xx-xx-xx'}
                            </Text>
                          </View>
                        </Pressable>
                        <View
                          key={i}
                          style={{
                            borderBottomColor: '#eee',
                            borderBottomWidth: 1,
                            marginTop: 5,
                          }}></View>
                      </View>
                    );
                  })
                : null}
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#EEEEEE',
    borderRadius: 23,
    paddingLeft: 15,
    flex: 1,
  },
  avatar: {
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 999,
  },
  cmtGroup: {marginTop: 2, marginLeft: 50},
  AvatarCmt: {
    flexDirection: 'row',
  },
  inputGroup: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 5,
    backgroundColor: '#1777F2',
    padding: 10,
    borderRadius: 999,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
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
    margin: '2%',
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
  userName: {
    marginLeft: 10,
  },
});
export default Transfers;
