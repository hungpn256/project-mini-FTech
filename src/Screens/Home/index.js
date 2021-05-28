import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import Article from '../../Components/Article';
import PostArticle from '../../Components/PostArticle';
const Home = () => {
  // const dispatch = useDispatch()
  // const handleLogout = () =>{
  //   dispatch({
  //     type:LOGOUT
  //   })
  // }
  return (
    <ScrollView>
      <Text style={{fontSize: 50, backgroundColor: '#fff'}}>Logo</Text>
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
