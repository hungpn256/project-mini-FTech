import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {useDispatch, useSelector} from 'react-redux';
import {
  GET_CONVERSATION,
  GET_CONVERSATION_SUCCESS,
  SEND_MESSAGE,
} from '../../constants';
export default function Messenger({route}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector(state => state.auth.user);
  let messages = useSelector(state => state.chat.conversation?.messages ?? []);
  messages = messages.map(message => {
    return {
      ...message,
      createdAt: message?.createdAt?.toDate(),
    };
  });
  messages = messages.reverse();
  let {roomId} = route.params;
  roomId = route.params.roomId;
  useEffect(() => {
    dispatch({type: GET_CONVERSATION, payload: roomId});
    firestore()
      .collection('room-chat')
      .doc(roomId)
      .onSnapshot(
        res => {
          dispatch({
            type: GET_CONVERSATION_SUCCESS,
            payload: res.data(),
          });
        },
        err => {
          console.log(err);
        },
      );
  }, []);
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
    />
  );
}
