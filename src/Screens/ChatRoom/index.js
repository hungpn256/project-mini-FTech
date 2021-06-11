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
import {useSelector} from 'react-redux';
import {commonRoom} from '../../Helper/function';
import {avatarDefault} from '../../index_Constant';
import SearchBar from './components/SearchBar';
import {createConversation} from './service';
import styles from './styles';
export default function ChatRoom({navigation}) {
  const [roomList, setRoomList] = useState([]);
  const userId = auth().currentUser.uid;
  const user = useSelector(state => state.auth.user);
  const chat = useSelector(state => state.chat);
  const {conversation, userSearch} = chat;
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
      console.log(conversationOrdered, 'roomlist');
      setRoomList(conversationOrdered);
    };
    x();
  }, [conversation]);

  return (
    <GestureRecognizer
      onSwipeRight={() => {
        navigation.goBack();
      }}>
      <ScrollView style={{backgroundColor: '#fff'}}>
        <SearchBar />
        <View style={styles.friendWrapper}>
          <ScrollView
            horizontal={true}
            style={styles.friendWrapper}
            showsHorizontalScrollIndicator={false}>
            {userSearch &&
              userSearch.map(item => {
                return (
                  <Pressable
                    key={item.id}
                    style={styles.wrapperAvatar}
                    onPress={async () => {
                      let room = commonRoom(item, user);
                      if (room.length === 0) {
                        const res = await createConversation([
                          user.id,
                          item.id,
                        ]);
                        room.push(res.id);
                      }
                      navigation.navigate('Messenger', {
                        roomId: room[0],
                      });
                    }}>
                    <Avatar.Image
                      source={{
                        uri:
                          item.avatar.length > 0 ? item.avatar : avatarDefault,
                      }}
                      style={styles.avatar}
                      size={70}
                    />
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
              const {messages} = i;
              if (messages.length)
                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.7}
                    onPress={() => {
                      navigation.navigate('Messenger', {roomId: i.id});
                    }}>
                    <Card style={styles.card}>
                      <List.Item
                        style={styles.item}
                        title={
                          <View style={styles.wrapperTitle}>
                            <Text style={styles.name}>{userOther.name}</Text>
                            <Text style={styles.time}>
                              {moment(
                                i.updatedAt?.toDate() ?? new Date(),
                              ).fromNow()}
                            </Text>
                          </View>
                        }
                        description={messages[messages.length - 1].text}
                        titleStyle={styles.titleStyle}
                        left={() => (
                          <Avatar.Image
                            source={{
                              uri: userOther.avatar || avatarDefault,
                            }}
                            size={55}
                          />
                        )}
                      />
                    </Card>
                  </TouchableOpacity>
                );
            })}
        </View>
      </ScrollView>
    </GestureRecognizer>
  );
}
