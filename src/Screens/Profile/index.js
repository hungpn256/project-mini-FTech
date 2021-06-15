import PostArticle from '@Components/PostArticle.js';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {Button} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import Article from '../../Components/Article.js';
import Loading from '../../Components/Loading/index.js';
import {avatarDefault} from '../../index_Constant.js';
import {MODAL_CHANGE_STATE} from '../Modal/constant.js';
import About from './components/About.js';
import FormEdit from './components/FormEdit.js';
import ImageComponent from './components/Image';
import SetImage from './components/SetImage.js';
import {
  GET_ME,
  GET_PROFILE,
  PROFILE_CHANGE_STATE,
  UPDATE_ME,
} from './constants.js';
import styles from './styles';
const Profile = ({navigation, route}) => {
  const id = route?.params?.id;
  const [tab, setTab] = useState(1);
  const dispatch = useDispatch();
  const onRefresh = useCallback(() => {
    if (id) {
      dispatch({type: GET_PROFILE, payload: id});
    } else {
      let uid = auth().currentUser.uid;
      dispatch({type: GET_ME, payload: uid});
    }
  }, [id]);
  useEffect(() => {
    onRefresh();
  }, [onRefresh]);
  const profile = useSelector(state => state.profile);
  const {
    role,
    user: me,
    profile: other,
    loading,
    posts: postsMe,
    postsProfile,
    visibleModal,
  } = profile;
  const user = id ? other : me;
  const posts = id ? postsProfile : postsMe;
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
    <>
      <ScrollView
        style={styles.background}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }>
        <Loading loading={loading} />
        <View style={styles.body}>
          <View style={styles.image}>
            <View style={styles.wrapperCover}>
              {user.background?.length > 0 && (
                <Pressable
                  onPress={() => {
                    dispatch({
                      type: MODAL_CHANGE_STATE,
                      payload: {image: user.background},
                    });
                  }}>
                  <Image
                    style={styles.cover}
                    source={{
                      uri: user.background,
                    }}
                  />
                </Pressable>
              )}
              {!id && (
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
              <Pressable
                onPress={() => {
                  dispatch({
                    type: MODAL_CHANGE_STATE,
                    payload: {image: user.avatar},
                  });
                }}>
                <Image
                  style={styles.avatar}
                  source={{
                    uri: user.avatar || avatarDefault,
                  }}
                />
              </Pressable>
              {!id && <SetImage setImage={setAvatar} />}
            </View>
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <View style={styles.btnGroup}>
            {id ? (
              <Button style={styles.btn} mode="contained">
                <AntDesign name="pluscircle" size={16} color="#fff" />
                <Text style={styles.btnText}> Add friend</Text>
              </Button>
            ) : (
              <Button
                style={styles.btn}
                mode="contained"
                onPress={() => {
                  dispatch({
                    type: PROFILE_CHANGE_STATE,
                    payload: {visibleModal: true},
                  });
                }}>
                <AntDesign name="edit" size={16} color="#fff" />
                <Text style={styles.btnText}> Edit profile</Text>
              </Button>
            )}
          </View>
          <View style={styles.infor}>
            <View style={styles.inforItem}>
              <Text style={styles.inforItemTitle}>Posts</Text>
              <Text style={styles.inforItemNumber}>{posts?.length ?? 0}</Text>
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
              style={[
                {
                  marginVertical: 5,
                },
                tab === 1 && styles.btnActive,
              ]}
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
              style={[
                {
                  marginVertical: 5,
                },
                tab === 2 && styles.btnActive,
              ]}
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
              style={[
                {
                  marginVertical: 5,
                },
                tab === 3 && styles.btnActive,
              ]}
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
                {!id && <PostArticle />}
                {posts &&
                  posts.map(item => {
                    return (
                      <Article
                        time={moment(item.createAt?.toDate()).fromNow()}
                        key={item.id}
                        text={item.content}
                        image={item.imageUrl}
                        uid={item.userId}
                      />
                    );
                  })}
              </View>
            </View>
          ) : tab === 2 ? (
            <View style={styles.viewContent}>
              <View style={styles.photosImages}>
                {posts &&
                  posts.map(item => {
                    if (item.imageUrl)
                      return <ImageComponent key={item.id} item={item} />;
                  })}
              </View>
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
      <Modal
        visible={visibleModal}
        onRequestClose={() => {
          dispatch({
            type: PROFILE_CHANGE_STATE,
            payload: {visibleModal: false},
          });
        }}>
        <FormEdit />
      </Modal>
    </>
  );
};

export default Profile;
