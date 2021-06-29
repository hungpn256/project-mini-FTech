import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Pressable, Image} from 'react-native';
import {Avatar} from 'react-native-paper';
import {avatarDefault} from '../index_Constant';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {markReadNoti} from '../Screens/Notification/service';
import {useDispatch} from 'react-redux';
import {MARK_READ_NOTIFICATION} from '../Screens/Notification/constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default function Notification({item}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <Pressable
      onPress={() => {
        dispatch({type: MARK_READ_NOTIFICATION, payload: item.id});
        markReadNoti(item.id);
        navigation.navigate('PostDetail', {postid: item.postId});
      }}
      style={[
        styles.container,
        {backgroundColor: item.unread ? '#EBF5FB' : '#fff'},
      ]}>
      <View style={{borderWidth: 1, borderColor: '#eee', borderRadius: 999}}>
        <Avatar.Image
          source={{
            uri: item.users[0].avatar || avatarDefault,
          }}
          size={65}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 4,
            right: -4,
            backgroundColor: item.type === 1 ? '#1777F2' : '#2ECC71',
            borderRadius: 999,
          }}>
          {item.type === 1 ? (
            <AntDesign
              name="like1"
              color="#fff"
              size={13}
              style={{padding: 5}}
            />
          ) : (
            <FontAwesome
              name="comment"
              color="#fff"
              size={13}
              style={{padding: 5}}
            />
          )}
        </View>
      </View>
      <View style={styles.content}>
        <Text style={[styles.text, {color: '#000'}]}>
          <Text style={styles.name}>
            {item.users.map(u => u.name).join(', ')}
          </Text>{' '}
          {item.type === 1
            ? 'đã like bài viết của bạn'
            : 'đã comment bài viết của bạn'}
        </Text>
        <Text style={styles.time}>
          {moment(item.updateAt.toDate?.()).fromNow()}
        </Text>
      </View>
      <View>
        {item.post.imageUrl.length > 0 && (
          <Image
            style={{width: 65, height: 65, borderRadius: 4}}
            source={{uri: item.post.imageUrl}}
          />
        )}
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  content: {
    flex: 1,
    marginLeft: 8,
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
  },
  name: {
    fontWeight: '700',
  },
  time: {
    color: '#777',
    fontSize: 13,
  },
});
