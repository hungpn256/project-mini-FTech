import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import Article from '../../Components/Article';
import PostArticle from '../../Components/PostArticle';
import {LOGOUT} from '../Auth/constants';
const Home = () => {
  return (
    <ScrollView>
      <View style={{flexDirection: 'row'}}>
        <Text style={{fontSize: 50, backgroundColor: '#fff'}}>Logo</Text>
      </View>
      <PostArticle />
      <Article />
      <Article />
      <Article />
      <Article />
      <Article />
      <Article />
      <Article />
    </ScrollView>
  );
};

export default Home;
