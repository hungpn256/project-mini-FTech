import React, {useState} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import Article from '../../Components/Article.js';
import PostArticle from '../../Components/PostArticle.js';
import About from './components/About.js';
import Photos from './components/Photos.js';
import styles from './styles';

const Profile = ({navigation}) => {
  const [tab, setTab] = useState(1);

  return (
    <ScrollView style={styles.background}>
      <View style={styles.body}>
        <View style={styles.image}>
          <Image
            style={styles.cover}
            source={{
              uri: 'https://scontent-xsp1-3.xx.fbcdn.net/v/t1.6435-9/s960x960/133854021_1823631001138062_4807573368620165003_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=e3f864&_nc_ohc=UMXfqOYqYpwAX9pPAtd&_nc_ht=scontent-xsp1-3.xx&tp=7&oh=2caa49a66dddbd2659604498c910de03&oe=60C1EE0D',
            }}
          />
          <Image
            style={styles.avatar}
            source={{
              uri: 'https://scontent.fhan4-1.fna.fbcdn.net/v/t1.6435-1/p160x160/69198146_1346843938816773_7149406761399615488_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=7206a8&_nc_ohc=T2HIPc3q7xIAX_ZdU2e&_nc_ht=scontent.fhan4-1.fna&tp=6&oh=1d695792abaf91545e01681f2983b0f6&oe=60C319FF',
            }}
          />
        </View>
        <Text style={styles.name}>Phạm Năng Hưng</Text>
        <View style={styles.infor}>
          <View style={styles.inforItem}>
            <Text style={styles.inforItemTitle}>Posts</Text>
            <Text style={styles.inforItemNumber}>10</Text>
          </View>
          <View style={styles.inforItem}>
            <Text style={styles.inforItemTitle}>Followers</Text>
            <Text style={styles.inforItemNumber}>124</Text>
          </View>
          <View style={styles.inforItem}>
            <Text style={styles.inforItemTitle}>Following</Text>
            <Text style={styles.inforItemNumber}>125</Text>
          </View>
        </View>

        <View style={styles.selectorTab}>
          <Button
            mode="text"
            style={[tab === 1 && styles.btnActive]}
            uppercase={false}
            color="#3498DB"
            onPress={() => {
              setTab(1);
            }}>
            <Text style={[styles.textHeader, tab === 1 && styles.txtActive]}>
              Posts
            </Text>
          </Button>
          <Button
            mode="text"
            style={[tab === 2 && styles.btnActive]}
            uppercase={false}
            color="#3498DB"
            onPress={() => {
              setTab(2);
            }}>
            <Text style={[styles.textHeader, tab === 2 && styles.txtActive]}>
              Photos
            </Text>
          </Button>
          <Button
            mode="text"
            style={[tab === 3 && styles.btnActive]}
            uppercase={false}
            color="#3498DB"
            onPress={() => {
              setTab(3);
            }}>
            <Text style={[styles.textHeader, tab === 3 && styles.txtActive]}>
              About
            </Text>
          </Button>
        </View>
        {tab === 1 ? (
          <View style={styles.viewContent}>
            <View style={{marginVertical: 8}}>
              <PostArticle />
            </View>
            <Article />
            <Article />
            <Article />
            <Article />
          </View>
        ) : tab === 2 ? (
          <View style={styles.viewContent}>
            <Photos />
          </View>
        ) : (
          <View style={styles.viewContent}>
            <About />
            <About />
            <About />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Profile;
