import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import React, {useEffect} from 'react';
import {RefreshControl, ScrollView, Text, View} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useDispatch, useSelector} from 'react-redux';
import Article from '../../Components/Article';
import PostArticle from '../../Components/PostArticle';
import {GET_POST} from './constants';
import auth from '@react-native-firebase/auth';
import styles from './styles';
import {Badge} from 'react-native-paper';
import Nothing from '../../Components/Nothing';
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
import {OPEN_LIKE_MODAL} from '../Screens/ModalLike/constants';
import ModalLike from '@Screens/ModalLike';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Home = () => {
  const navigation = useNavigation();
  const postData = useSelector(state => state.home.post);
  const conversation = useSelector(state => state.chat.conversation);
  const userId = useSelector(state => state.auth.user.id);
  let unread = 0;
  for (let i in conversation) {
    if (conversation[i].unread.indexOf(userId) !== -1) {
      unread++;
    }
  }
  const dispatch = useDispatch();
  useEffect(() => {
    firestore()
      .collection('post')
      .onSnapshot(() => {
        dispatch({type: GET_POST});
      });
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
      if (remoteMessage.data.article) {
        navigation.navigate('PostDetail', {
          postid: remoteMessage.data.article.id,
        });
      } else if (remoteMessage.data.messenger) {
        navigation.navigate('Messenger', {
          roomId: remoteMessage.data.messenger.id,
          name: remoteMessage.data.messenger.name,
        });
      } else {
        console.log(remoteMessage, 'naaa');
        navigation.navigate(remoteMessage.data.navigate);
      }
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
          if (remoteMessage?.data?.article) {
            navigation.navigate('PostDetail', {
              postid: remoteMessage.data.article,
            });
          } else if (remoteMessage?.data?.messenger) {
            navigation.navigate('Messenger', {
              roomId: remoteMessage.data.messenger,
              name: remoteMessage.data.name,
            });
          } else {
            console.log(remoteMessage, 'naaa');
            navigation.navigate(remoteMessage.data.navigate);
          }
        }
      });
  }, []);

  return (
    <>
      <View style={styles.header}>
        <ModalLike />
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: '#1777F2',
            backgroundColor: '#fff',
          }}>
          Fsocial
        </Text>
        <View style={styles.groupBtn}>
          <View style={styles.wrapperIcon}>
            <Fontisto
              style={styles.icon}
              name="search"
              color="#1777F2"
              size={21}
              onPress={() => {
                navigation.navigate('Search');
              }}
            />
          </View>
          <View style={styles.wrapperIcon}>
            <Fontisto
              style={styles.icon}
              onPress={() => {
                navigation.navigate('ChatRoom');
              }}
              name="messenger"
              color="#1777F2"
              size={21}
            />
            {unread !== 0 && (
              <Badge style={{position: 'absolute'}}>{unread}</Badge>
            )}
          </View>
        </View>
      </View>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: '#eeeeee'}}>
        <PostArticle />
        {postData && postData.length > 0 ? (
          postData.map(item => {
            return (
              <Article
                time={moment(
                  item.createAt?.toDate?.() ?? item.createAt,
                ).fromNow()}
                key={item.id}
                text={item.content}
                image={item.imageUrl}
                uid={item.userId}
                postid={item.id}
              />
            );
          })
        ) : (
          <Nothing />
        )}
      </ScrollView>
    </>
  );
};

export default Home;
