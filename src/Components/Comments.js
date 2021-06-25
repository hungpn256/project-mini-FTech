import React, {useState, useEffect} from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {Dimensions, StyleSheet} from 'react-native';
import {Avatar, Card, Paragraph, Title, Button} from 'react-native-paper';
import avatarImg from '../../assets/Img/avatar.png';
import auth, {firebase} from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';
import {MODAL_CHANGE_STATE} from '@Screens/Modal/constant';
import {useNavigation} from '@react-navigation/native';
export default function Comments({userId, cmtId, time, content, image}) {
  const [user, setUser] = useState();
  const navigate = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    const userInfo = async () => {
      if (userId) {
        const users = await firestore().collection('user').doc(userId).get();
        setUser(users.data());
      }
    };
    userInfo();
  }, []);

  const handleNavi = () => {
    if (user.id === auth().currentUser.uid) {
      navigate.navigate('Profile', {id: auth().currentUser.uid});
    } else {
      navigate.navigate('Profile-o', {id: user.id, name: user.name});
    }
  };

  return (
    <View style={styles.cmtWrapper}>
      {user ? (
        <>
          <View style={styles.AvatarCmt}>
            {user.avatar ? (
              <Pressable onPress={handleNavi}>
                <Avatar.Image source={{uri: user.avatar}} size={40} />
              </Pressable>
            ) : (
              <Pressable onPress={handleNavi}>
                <Avatar.Image source={avatarImg} size={40} />
              </Pressable>
            )}
            <View style={styles.cmt}>
              <Text onPress={handleNavi} style={styles.userName}>
                {user.name}
              </Text>
              {content ? <Text>{content}</Text> : null}
            </View>
          </View>
          <View style={styles.cmtGroup}>
            {image ? (
              <Pressable
                onPress={() =>
                  dispatch({
                    type: MODAL_CHANGE_STATE,
                    payload: {image: image},
                  })
                }>
                <Image style={styles.imgCmt} source={{uri: image}} />
              </Pressable>
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
