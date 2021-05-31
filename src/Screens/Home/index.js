import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Article from '../../Components/Article';
import PostArticle from '../../Components/PostArticle';
import styles from './styles';
const Home = ({navigation}) => {
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
