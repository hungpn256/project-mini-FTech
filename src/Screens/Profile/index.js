import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import Article from '../../Components/Article.js';
import PostArticle from '@Components/PostArticle.js';
import About from './components/About.js';
import Photos from './components/Photos.js';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import SetImage from './components/SetImage.js';
import {avatarDefault} from '../../index_Constant.js';
import {GET_ME, GET_PROFILE, UPDATE_ME} from './constants.js';
import auth from '@react-native-firebase/auth';
import Loading from '../../Components/Loading/index.js';
const Profile = ({navigation, route}) => {
  const id = route?.params?.id;
  const [tab, setTab] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch({type: GET_PROFILE, payload: id});
    } else {
      let uid = auth().currentUser.uid;
      dispatch({type: GET_ME, payload: uid});
    }
  }, []);
  const profile = useSelector(state => state.profile);
  const {role, user: me, profile: other, loading} = profile;
  const user = id ? other : me;
  console.log(user, 'user');
  const setAvatar = image => {
    dispatch({type: UPDATE_ME, payload: {avatar: image}});
  };
  const setBackground = image => {
    dispatch({type: UPDATE_ME, payload: {background: image}});
  };
  if (!user || loading) {
    return <Loading loading={loading} />;
  }
  return (
    <ScrollView style={styles.background}>
      <Loading loading={loading} />
      <View style={styles.body}>
        <View style={styles.image}>
          <View style={styles.wrapperCover}>
            {user.background?.length > 0 && (
              <Image
                style={styles.cover}
                source={{
                  uri: user.background,
                }}
              />
            )}
            {role === 0 && (
              <SetImage
                setImage={setBackground}
                style={{
                  right: 20,
                  bottom: user.background?.length > 0 ? 180 : -100,
                }}
              />
            )}
          </View>

          <View style={styles.wrapperAvatar}>
            <Image
              style={styles.avatar}
              source={{
                uri: user.avatar || avatarDefault,
              }}
            />
            {role === 0 && <SetImage setImage={setAvatar} />}
          </View>
        </View>
        <Text style={styles.name}>{user.name}</Text>
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
              {role === 0 && <PostArticle />}
            </View>
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
