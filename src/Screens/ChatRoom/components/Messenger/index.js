import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {useDispatch, useSelector} from 'react-redux';
import * as _ from 'lodash';
import firestore from '@react-native-firebase/firestore';
import {
  CREATE_CONVERSATION,
  GET_CONVERSATION,
  GET_CONVERSATION_SUCCESS,
  SEND_MESSAGE,
} from '../../constants';
export default function Messenger({route}) {
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);
  console.log(user.id, 'user');
  let messages = useSelector(state => state.chat.conversation?.messages ?? []);
  messages = messages.map(message => {
    return {
      ...message,
      createdAt: message?.createdAt?.toDate(),
      user: {...user, _id: message.user.id},
    };
  });
  console.log(messages, 'mes');
  let {roomId} = route.params;
  roomId = route.params.roomId;
  useEffect(() => {
    const {user: user2} = route.params;
    console.log(roomId);
    if (roomId) {
      dispatch({type: GET_CONVERSATION, payload: roomId});
    } else {
      dispatch({type: CREATE_CONVERSATION, payload: [user, user2]});
    }
    firestore()
      .collection('room-chat')
      .doc('yG1SIe4i4G5UKtmhZ8cP')
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
      user={{_id: user.id, avatar: user.avatarUrl, name: user.name}}
      isTyping={true}
    />
  );
}
