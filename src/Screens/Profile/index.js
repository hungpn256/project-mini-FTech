import PostArticle from '@Components/PostArticle.js';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {Button} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import Article from '../../Components/Article.js';
import Loading from '../../Components/Loading/index.js';
import {avatarDefault} from '../../index_Constant.js';
import {MODAL_CHANGE_STATE} from '../Modal/constant.js';
import About from './components/About.js';
import ImageComponent from './components/Image';
import SetImage from './components/SetImage.js';
import {
  ACCEPT_FRIEND,
  ADD_FRIEND,
  GET_ME,
  GET_PROFILE,
  REMOVE_FRIEND,
  UPDATE_ME,
} from './constants.js';
import styles from './styles';
const Profile = ({navigation, route}) => {
  //1 chưa gửi lời mời, 2 chưa được chấp thuận, 3 chờ mình chấp thuận, 4 đã chấp thuận
  const [roleFriend, setRoleFriend] = useState(1);
  const id = route?.params?.id;
  const [tab, setTab] = useState(1);
  const dispatch = useDispatch();
  const onRefresh = useCallback(() => {
    if (id) {
      dispatch({type: GET_PROFILE, payload: id});
    } else {
      dispatch({type: GET_ME, payload: auth().currentUser.uid});
    }
  }, [id]);
  const me = useSelector(state => state.auth.user);
  useEffect(() => {
    onRefresh();
  }, [onRefresh]);
  const profile = useSelector(state => state.profile);
  const {profile: other, loading, posts: postsMe, postsProfile, role} = profile;
  useEffect(() => {
    setRoleFriend(role);
  }, [role]);
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
              <Button
                style={styles.btn}
                mode="contained"
                onPress={() => {
                  if (roleFriend === 4) {
                    setRoleFriend(1);
                    dispatch({
                      type: REMOVE_FRIEND,
                      payload: {
                        friendIdPartner: user.friend.id,
                        friendId: me.friend.id,
                        id,
                      },
                    });
                  } else if (roleFriend === 3) {
                    setRoleFriend(4);
                    dispatch({
                      type: ACCEPT_FRIEND,
                      payload: {
                        friendIdPartner: user.friend.id,
                        friendId: me.friend.id,
                        id,
                      },
                    });
                  } else if (roleFriend === 2) {
                    setRoleFriend(1);
                    dispatch({
                      type: REMOVE_FRIEND,
                      payload: {
                        friendIdPartner: user.friend.id,
                        friendId: me.friend.id,
                        id,
                      },
                    });
                  } else {
                    setRoleFriend(2);
                    dispatch({
                      type: ADD_FRIEND,
                      payload: {
                        friendIdPartner: user.friend.id,
                        friendId: me.friend.id,
                        id,
                      },
                    });
                  }
                }}>
                {roleFriend === 4 ? (
                  <Ionicons name="trash" size={16} color="#fff" />
                ) : roleFriend === 3 ? (
                  <AntDesign name="checkcircle" size={16} color="#fff" />
                ) : roleFriend === 2 ? (
                  <Ionicons name="remove-circle" size={16} color="#fff" />
                ) : (
                  <AntDesign name="pluscircle" size={16} color="#fff" />
                )}

                <Text style={styles.btnText}>
                  {roleFriend === 4
                    ? ' Remove friend'
                    : roleFriend === 3
                    ? ' Accept'
                    : roleFriend === 2
                    ? ' Involke'
                    : ' Add friend'}
                </Text>
              </Button>
            ) : (
              <Button
                style={styles.btn}
                mode="contained"
                onPress={() => {
                  navigation.navigate('EditProfile');
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
                        postid={item.id}
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
              <About user={user} />
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default Profile;
