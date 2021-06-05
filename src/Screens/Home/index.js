import React, {useEffect} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useSelector, useDispatch} from 'react-redux';
import Article from '../../Components/Article';
import PostArticle from '../../Components/PostArticle';
import styles from './styles';
import firestore from '@react-native-firebase/firestore';
import {GET_POST} from './constants';
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
      {postData.map(item => {
        return (
          <Article
            key={item.postId}
            text={item.content}
            image={item.imageUrl}
          />
        );
      })}
    </ScrollView>
  );
};

export default Home;
