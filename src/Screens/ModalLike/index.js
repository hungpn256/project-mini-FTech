import React, {useEffect, useState} from 'react';
import {View, Text, Modal, ScrollView, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './style';
import Icon from 'react-native-vector-icons/AntDesign';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Avatar, Card, Paragraph, Title, Button} from 'react-native-paper';
import avatarImg from '../../../assets/Img/avatar.jpg';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {CLOSE_LIKE_MODAL} from './constants';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useNavigation} from '@react-navigation/native';
export default function index() {
  const status = useSelector(state => state.modalLike.status);
  const postId = useSelector(state => state.modalLike.postId);
  const dispatch = useDispatch();
  const [all, setAll] = useState([]);
  const [load, setLoad] = useState(true);
  const navigate = useNavigation();
  useEffect(() => {
    const user = async () => {
      if (postId) {
        const query = await firestore().collection('post').doc(postId).get();
        const user = query.data().like;
        const arr = [];
        if (user.length > 0) {
          for (let i = 0; i < user.length; i++) {
            const item = await firestore()
              .collection('user')
              .doc(user[i])
              .get();
            arr.push(item.data());
          }
          setAll(arr);
          setLoad(false);
        } else {
          setLoad(false);
        }
      }
    };
    user();
    return () => {
      setAll([]);
      setLoad(true);
    };
  }, [postId]);

  const handleNavi = (uid, userName) => {
    if (uid === auth().currentUser.uid) {
      navigate.navigate('Profile', {id: uid});
    } else {
      navigate.navigate('Profile-o', {id: uid, name: userName});
    }
  };
  return (
    <Modal visible={status} animationType="fade">
      <View style={styles.header}>
        <Text style={styles.textHeader}>Post Like</Text>
        <Icon
          name="close"
          onPress={() => dispatch({type: CLOSE_LIKE_MODAL})}
          size={22}
          style={styles.closeModal}
        />
      </View>
      {load ? (
        <SkeletonPlaceholder>
          <View style={{padding: 10}}>
            <View style={{width: 70, height: 20, borderRadius: 18}}></View>
            <View
              style={{
                marginTop: 10,
                width: '100%',
                height: 50,
                borderRadius: 23,
              }}></View>
          </View>
        </SkeletonPlaceholder>
      ) : (
        <>
          <View
            style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
            <Text>Total: {all.length > 0 ? all.length : 0} </Text>
            <AntDesignIcon
              style={{
                padding: 4,
                backgroundColor: '#1777F2',
                borderRadius: 999,
              }}
              color="white"
              name="like1"
              size={11}
            />
          </View>
          <View style={{flex: 1, paddingHorizontal: 10}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {all.map(item => {
                return (
                  <Pressable
                    onPress={() => handleNavi(item.id, item.name)}
                    key={item.id}
                    style={styles.avatarLike}>
                    {item.avatar ? (
                      <View style={{marginBottom: 10}}>
                        <Avatar.Image
                          size={45}
                          source={{
                            uri: item.avatar,
                          }}
                        />
                        <AntDesignIcon
                          style={{
                            padding: 4,
                            backgroundColor: '#1777F2',
                            borderRadius: 999,
                            position: 'absolute',
                            bottom: -5,
                            right: -5,
                          }}
                          color="white"
                          name="like1"
                          size={11}
                        />
                      </View>
                    ) : (
                      <View style={{marginBottom: 10}}>
                        <Avatar.Image size={45} source={avatarImg} />
                        <AntDesignIcon
                          style={{
                            padding: 4,
                            backgroundColor: '#1777F2',
                            borderRadius: 999,
                            position: 'absolute',
                            bottom: -5,
                            right: -5,
                          }}
                          color="white"
                          name="like1"
                          size={11}
                        />
                      </View>
                    )}
                    <Text style={styles.userName}>{item.name}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </>
      )}
    </Modal>
  );
}
