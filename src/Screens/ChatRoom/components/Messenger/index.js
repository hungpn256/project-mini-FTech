import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {useDispatch, useSelector} from 'react-redux';
import {SEND_MESSAGE} from '../../constants';
import Entypo from 'react-native-vector-icons/Entypo';
import {launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
export default function Messenger({route}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector(state => state.auth.user);
  let {roomId} = route.params;
  let messages = useSelector(
    state => state.chat.conversation[roomId]?.messages ?? [],
  );
  messages = messages.map(message => {
    return {
      ...message,
      createdAt: message?.createdAt?.toDate(),
    };
  });
  messages = messages.reverse();
  const onSend = message => {
    dispatch({
      type: SEND_MESSAGE,
      payload: {
        roomId,
        messages: message,
      },
    });
  };
  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{_id: user.id, avatar: user.avatar, name: user.name}}
      isTyping={true}
      onPressAvatar={prop => {
        navigation.navigate('Profile-o', {id: prop._id});
      }}
      renderActions={() => {
        return (
          <Pressable
            style={styles.action}
            onPress={() => {
              launchImageLibrary({mediaType: 'photo'}, props => {
                if (props.type === 'image/jpeg') {
                  const message = {
                    _id: uuid.v4(),
                    createAt: new Date(),
                    user: {_id: user.id, avatar: user.avatar, name: user.name},
                    image: props,
                    text: '',
                  };
                  onSend([message]);
                }
              });
            }}>
            <Entypo name="images" size={25} />
          </Pressable>
        );
      }}
    />
  );
}
const styles = StyleSheet.create({
  action: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
});
