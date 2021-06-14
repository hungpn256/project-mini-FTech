import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import React, {useEffect} from 'react';
import {ScrollView, Text, View} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useDispatch, useSelector} from 'react-redux';
import Article from '../../Components/Article';
import PostArticle from '../../Components/PostArticle';
import {GET_POST} from './constants';
import auth from '@react-native-firebase/auth';
import styles from './styles';
import {Badge} from 'react-native-paper';
const Home = ({navigation}) => {
  const postData = useSelector(state => state.home.post);
  const conversation = useSelector(state => state.chat.conversation);
  let unread = 0;
  for (let i in conversation) {
    if (conversation[i].unread.indexOf(auth().currentUser.uid) !== -1) {
      unread++;
    }
  }
  console.log(unread, 'home unread');
  const dispatch = useDispatch();
  useEffect(() => {
    firestore()
      .collection('post')
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(() => {
          dispatch({type: GET_POST});
        });
      });
  }, []);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={{fontSize: 25, backgroundColor: '#fff'}}>Logo</Text>
        <View style={styles.groupBtn}>
          <View style={styles.wrapperIcon}>
            <Fontisto
              style={styles.icon}
              name="search"
              color="rgb(64,159,255)"
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
              color="rgb(64,159,255)"
              size={21}
            />
            {unread !== 0 && (
              <Badge style={{position: 'absolute'}}>{unread}</Badge>
            )}
          </View>
        </View>
      </View>
      <PostArticle />
      {postData.map(item => {
        return (
          <Article
            time={moment(item.createAt?.toDate()).fromNow()}
            key={item.postId}
            text={item.content}
            image={item.imageUrl}
            uid={item.userId}
          />
        );
      })}
    </ScrollView>
  );
};

export default Home;
