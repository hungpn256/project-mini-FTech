import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar, List} from 'react-native-paper';
import GestureRecognizer from 'react-native-swipe-gestures';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import {commonRoom} from '../../../Helper/function';
import {avatarDefault} from '../../../index_Constant';
import {CREATE_CONVERSATION_SUCCESS, GET_USER_BY_NAME} from '../constants';
import {createConversation} from '../service';
import SearchBar from './SearchBar';
import Loading from '@Components/Loading';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const NewMessenger = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.auth.user);
  const [visibleModal, setVisibleModal] = useState(false);
  const userSearch = useSelector(state => state.chat.userSearch);
  const dispatch = useDispatch();
  const [txtSearch, setTxtSearch] = useState('');
  const ref = useRef(null);
  useEffect(() => {
    dispatch({
      type: GET_USER_BY_NAME,
      payload: txtSearch,
    });
  }, [txtSearch]);
  useEffect(() => {
    if (!visibleModal) {
      dispatch({
        type: GET_USER_BY_NAME,
        payload: '',
      });
    } else {
      ref.current.focus();
    }
  }, [visibleModal]);
  return (
    <View>
      <Loading loading={loading} />
      <TouchableOpacity
        style={styles.headerRight}
        onPress={() => {
          setVisibleModal(true);
        }}>
        <Entypo name="new-message" size={30} color="#1777F2" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        visible={visibleModal}
        transparent={true}
        onRequestClose={() => {
          setVisibleModal(false);
        }}>
        <GestureRecognizer
          onSwipeDown={() => {
            setVisibleModal(false);
          }}
          style={styles.background}>
          <View style={styles.container}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{flex: 1}}>
                <SearchBar
                  txtSearch={txtSearch}
                  setTxtSearch={setTxtSearch}
                  reff={ref}
                />
              </View>
              <TouchableOpacity onPress={() => setVisibleModal(false)}>
                <AntDesign
                  name="closecircle"
                  size={30}
                  color="#777"
                  style={{marginRight: 15, marginTop: 4}}
                />
              </TouchableOpacity>
            </View>
            <List.Section style={styles.result}>
              <List.Subheader>Result:</List.Subheader>
              <FlatList
                data={userSearch.filter(
                  item => item.id !== auth().currentUser.uid,
                )}
                renderItem={({item}) => (
                  <List.Item
                    style={styles.user}
                    title={item.name}
                    titleStyle={styles.name}
                    onPress={async () => {
                      setVisibleModal(false);
                      let room = commonRoom(item, user);
                      if (room.length === 0) {
                        setLoading(true);
                        const res = await createConversation([
                          user.id,
                          item.id,
                        ]);
                        dispatch({
                          type: CREATE_CONVERSATION_SUCCESS,
                          payload: {
                            [res.id]: {
                              users: [user, item],
                              isTyping: false,
                              messages: [],
                              unread: [],
                              updatedAt: firestore.FieldValue.serverTimestamp(),
                            },
                          },
                        });
                        room.push(res.id);
                        setLoading(false);
                      }
                      navigation.navigate('Messenger', {
                        roomId: room[0],
                      });
                    }}
                    left={() => (
                      <Avatar.Image
                        style={styles.avatar}
                        source={{
                          uri: item.avatar || avatarDefault,
                        }}
                        size={60}
                      />
                    )}
                  />
                )}
                keyExtractor={item => item.id}
              />
            </List.Section>
          </View>
        </GestureRecognizer>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginTop: 50,
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    borderRadius: 10,
    paddingTop: 20,
  },
  headerRight: {
    marginRight: 15,
  },
  avatarImg: {
    width: 50,
    height: 50,
  },
  result: {
    marginTop: 20,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 5,
  },
});
export default NewMessenger;
