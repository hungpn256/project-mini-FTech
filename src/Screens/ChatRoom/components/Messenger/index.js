import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import ImageModal from 'react-native-image-modal';
import {launchImageLibrary} from 'react-native-image-picker';
import uuid from 'react-native-uuid';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import {MARK_READ, SEND_MESSAGE} from '../../constants';

export default function Messenger({route}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector(state => state.auth.user);
  let {roomId} = route.params;
  const chat = useSelector(state => state.chat);
  let messages = chat.conversation[roomId]?.messages ?? [];
  messages = messages.map(message => {
    return {
      ...message,
      createdAt: message?.createdAt?.toDate?.() ?? new Date(),
    };
  });
  console.log('messenge rerender');
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
        navigation.navigate('Profile-o', {id: prop._id, name: prop.name});
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
                if (props.assets && props.assets[0].type === 'image/jpeg') {
                  const message = {
                    _id: uuid.v4(),
                    createAt: new Date(),
                    user: {_id: user.id, avatar: user.avatar, name: user.name},
                    image: props.assets[0],
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
