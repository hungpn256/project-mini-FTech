import auth from '@react-native-firebase/auth';
import {orderBy} from 'lodash';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar, Card, List} from 'react-native-paper';
import GestureRecognizer from 'react-native-swipe-gestures';
import {useDispatch, useSelector} from 'react-redux';
import {commonRoom} from '../../Helper/function';
import {avatarDefault} from '../../index_Constant';
import SearchBar from './components/SearchBar';
import SwipeCustom from './components/SwipeCustom';
import {createConversation} from './service';
import styles from './styles';
import Loading from '@Components/Loading';
import {CREATE_CONVERSATION_SUCCESS} from './constants';
import firestore from '@react-native-firebase/firestore';
export default function ChatRoom({navigation}) {
  const [roomList, setRoomList] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = auth().currentUser.uid;
  const user = useSelector(state => state.auth.user);
  const chat = useSelector(state => state.chat);
  const {conversation, userSearch} = chat;
  const [filter, setFilter] = useState('');
  const dispatch = useDispatch();
  console.log('re-render');
  useEffect(() => {
    const x = async () => {
      let conversationOrdered = [];
      for (const i in conversation) {
        conversationOrdered.push({id: i, ...conversation[i]});
      }
      conversationOrdered = orderBy(
        conversationOrdered,
        ['updatedAt'],
        ['desc'],
      );
      setRoomList(conversationOrdered);
    };
    x();
  }, [conversation]);

  return (
    <GestureRecognizer
      onSwipeRight={() => {
        navigation.goBack();
      }}
      style={{backgroundColor: '#fff', flex: 1}}>
      <Loading loading={loading} />
      <ScrollView>
        <SearchBar txtSearch={filter} setTxtSearch={setFilter} />
        <View style={styles.friendWrapper}>
          <ScrollView
            horizontal={true}
            style={styles.friendWrapper}
            showsHorizontalScrollIndicator={false}>
            {userSearch &&
              userSearch
                .filter(item => item.id !== auth().currentUser.uid)
                .map(item => {
                  return (
                    <Pressable
                      key={item.id}
                      style={styles.wrapperAvatar}
                      onPress={async () => {
                        let room = commonRoom(item, user);
                        if (room.length === 0) {
                          setLoading(true);
                          const res = await createConversation([
                            user.id,
                            item.id,
                          ]);
                          room.push(res.id);
                          dispatch({
                            type: CREATE_CONVERSATION_SUCCESS,
                            payload: {
                              [res.id]: {
                                users: [user, item],
                                isTyping: false,
                                messages: [],
                                unread: [],
                                updatedAt:
                                  firestore.FieldValue.serverTimestamp(),
                              },
                            },
                          });
                          setLoading(false);
                        }
                        navigation.navigate('Messenger', {
                          roomId: room[0],
                          name: userSearch.name,
                        });
                      }}>
                      <View
                        style={{
                          borderColor: '#EEEEEE',
                          borderWidth: 1,
                          borderRadius: 999,
                        }}>
                        <Avatar.Image
                          source={{
                            uri:
                              item.avatar.length > 0
                                ? item.avatar
                                : avatarDefault,
                          }}
                          style={styles.avatar}
                          size={65}
                        />
                      </View>

                      <Text style={[styles.name, {fontSize: 16}]}>
                        {item.name}
                      </Text>
                    </Pressable>
                  );
                })}
          </ScrollView>
        </View>
        <View>
          {roomList &&
            roomList.map((i, index) => {
              const userOther = i.users.find(i => i.id !== userId);
              const unread = i.unread.indexOf(userId) !== -1;
              const {messages} = i;
              if (
                messages.length &&
                userOther.name.toLowerCase().match(filter.toLowerCase())
              )
                return (
                  <SwipeCustom key={index} item={i} style={{marginVertical: 3}}>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => {
                        navigation.navigate('Messenger', {
                          roomId: i.id,
                          name: userOther.name,
                        });
                      }}>
                      <View style={styles.card}>
                        <List.Item
                          style={styles.item}
                          title={
                            <View style={styles.wrapperTitle}>
                              <Text style={styles.name}>{userOther.name}</Text>
                              <Text
                                style={[
                                  styles.time,
                                  unread && {
                                    ...styles.textUnread,
                                    fontSize: 13,
                                  },
                                ]}>
                                {moment(
                                  i.updatedAt?.toDate?.() ?? new Date(),
                                ).fromNow()}
                              </Text>
                            </View>
                          }
                          description={
                            messages[messages.length - 1].text.length === 0 &&
                            messages[messages.length - 1].image
                              ? 'đã gửi một ảnh'
                              : messages[messages.length - 1].text
                          }
                          descriptionStyle={unread && styles.textUnread}
                          titleStyle={styles.titleStyle}
                          left={() => (
                            <View
                              style={{
                                borderColor: '#EEEEEE',
                                borderWidth: 1,
                                borderRadius: 999,
                              }}>
                              <Avatar.Image
                                source={{
                                  uri: userOther.avatar || avatarDefault,
                                }}
                                size={55}
                              />
                            </View>
                          )}
                        />
                      </View>
                    </TouchableOpacity>
                  </SwipeCustom>
                );
            })}
        </View>
      </ScrollView>
    </GestureRecognizer>
  );
}
