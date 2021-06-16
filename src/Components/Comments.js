import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {Dimensions, StyleSheet} from 'react-native';
import {Avatar, Card, Paragraph, Title, Button} from 'react-native-paper';
import avatarImg from '../../assets/Img/avatar.png';
import auth, {firebase} from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
export default function Comments({userId, cmtId, time, content, image}) {
  const [user, setUser] = useState();
  useEffect(() => {
    const userInfo = async () => {
      if (userId) {
        const users = await firestore().collection('user').doc(userId).get();
        setUser(users.data());
      }
    };
    userInfo();
  }, []);

  return (
    <View style={styles.cmtWrapper}>
      {user ? (
        <>
          <View style={styles.AvatarCmt}>
            {user.avatar ? (
              <Avatar.Image source={{uri: user.avatar}} size={40} />
            ) : (
              <Avatar.Image source={avatarImg} size={40} />
            )}
            <View style={styles.cmt}>
              <Text style={styles.userName}>{user.name}</Text>
              {content ? <Text>{content}</Text> : null}
            </View>
          </View>
          <View style={styles.cmtGroup}>
            {image ? (
              <Image style={styles.imgCmt} source={{uri: image}} />
            ) : null}
            <Text style={{color: '#696969', fontSize: 12, marginLeft: 5}}>
              {time ? time : 'loading'}
            </Text>
          </View>
        </>
      ) : null}
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  cmtWrapper: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 5,
    backgroundColor: 'white',
  },
  userName: {
    fontWeight: 'bold',
  },
  cmt: {
    marginLeft: 8,
    padding: 7,
    borderRadius: 12,
    paddingHorizontal: 10,
    backgroundColor: '#f0f2f5',
    maxWidth: '85%',
  },
  imgCmt: {
    borderRadius: 18,
    width: windowWidth * 0.4,
    height: windowHeight * 0.3,
  },
  cmtGroup: {marginTop: 2, marginLeft: 50},
  AvatarCmt: {
    flexDirection: 'row',
  },
});
