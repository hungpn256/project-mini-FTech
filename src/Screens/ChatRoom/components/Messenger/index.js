import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {useDispatch, useSelector} from 'react-redux';
import {MARK_READ, SEND_MESSAGE} from '../../constants';
import Entypo from 'react-native-vector-icons/Entypo';
import {launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import ImageModal from 'react-native-image-modal';

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
  useEffect(() => {
    dispatch({type: MARK_READ, payload: {roomId}});
  }, []);
  return (
    <GiftedChat
      scrollToBottom={true}
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{_id: user.id, avatar: user.avatar, name: user.name}}
      isTyping={true}
      onPressAvatar={prop => {
        navigation.navigate('Profile-o', {id: prop._id});
      }}
      renderMessageImage={props => {
        return (
          <View
            style={{
              borderRadius: 15,
              padding: 2,
            }}>
            <ImageModal
              resizeMode="contain"
              style={{
                width: 200,
                height: 200,
                padding: 6,
                borderRadius: 15,
                resizeMode: 'cover',
              }}
              source={{uri: props.currentMessage.image}}
            />
          </View>
        );
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
