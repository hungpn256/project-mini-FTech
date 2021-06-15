import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {Dimensions, StyleSheet} from 'react-native';
import {Avatar, Card, Paragraph, Title, Button} from 'react-native-paper';
import avatarImg from '../../assets/Img/avatar.png';
export default function Comments({userId, cmtId, time, content, image}) {
  const [avatar, setAvatar] = useState('');
  return (
    <View style={styles.cmtWrapper}>
      <View style={styles.AvatarCmt}>
        {avatar ? (
          <Avatar.Image source={avatarImg} size={40} />
        ) : (
          <Avatar.Image source={avatarImg} size={40} />
        )}
        <View style={styles.cmt}>
          <Text style={styles.userName}>Bảo Hoàng</Text>
          {content ? <Text>{content}</Text> : null}
        </View>
      </View>

      <View style={styles.cmtGroup}>
        {image ? (
          <>
            <Image style={styles.imgCmt} source={{uri: image}} />
          </>
        ) : null}
        <Text style={{color: '#696969', fontSize: 12, marginTop: 5}}>
          {time ? time : 'loading'}
        </Text>
      </View>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  cmtWrapper: {
    flex: 1,
    padding: 10,
    marginBottom: 5,
  },
  cmt: {
    marginLeft: 8,
    padding: 10,
    borderRadius: 18,
    paddingHorizontal: 10,
    backgroundColor: '#f0f2f5',
  },
  imgCmt: {
    borderRadius: 18,
    width: windowWidth * 0.6,
    height: windowHeight * 0.4,
  },
  cmtGroup: {marginTop: 4, marginLeft: 50},
  AvatarCmt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
