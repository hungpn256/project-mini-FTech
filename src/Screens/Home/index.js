import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View, FlatList} from 'react-native';
import {Button} from 'react-native-paper';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useSelector, useDispatch} from 'react-redux';
import Article from '../../Components/Article';
import PostArticle from '../../Components/PostArticle';
import styles from './styles';
import firestore from '@react-native-firebase/firestore';
import {GET_POST, GET_MORE} from './constants';
import moment from 'moment';
import {log} from 'react-native-reanimated';
const Home = ({navigation}) => {
  const postData = useSelector(state => state.home.post);
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
    <ScrollView>
      <View style={styles.header}>
        <Text style={{fontSize: 50, backgroundColor: '#fff'}}>Logo</Text>
        <Button
          onPress={() => {
            navigation.navigate('ChatRoom');
          }}>
          <Fontisto name="messenger" size={30} />
        </Button>
      </View>
      <PostArticle />
      {/* <FlatList
        data={postData}
        renderItem={({item}) => (
          <Article
            time={moment(item.createAt.toDate()).fromNow()}
            key={item.postId}
            text={item.content}
            image={item.imageUrl}
          />
        )}
        // onEndReachedThreshold={0}
        // onEndReached={getMore}
        keyExtractor={item => item.postId}
      /> */}
      {postData.map(item => {
        return (
          <Article
            time={moment(item.createAt.toDate()).fromNow()}
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
