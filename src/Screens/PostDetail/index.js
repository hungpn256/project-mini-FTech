import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CMT, GET_CMT} from '@Screens/Home/constants';
import {MODAL_CHANGE_STATE} from '@Screens/Modal/constant';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Avatar, Card, Paragraph} from 'react-native-paper';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useDispatch, useSelector} from 'react-redux';
import avatarImg from '../../../assets/Img/avatar.png';
import Comments from '../../Components/Comments';
import InputEncloseAvatar from '../../Components/InputEncloseAvatar';
import {styles} from './styles';
import {addNoti, notiMes} from '../Notification/service';
const LeftContent = (img, navi) => (
  <>
    {img ? (
      <Pressable style={styles.avatar} onPress={navi}>
        <Avatar.Image source={{uri: img}} size={40} />
      </Pressable>
    ) : (
      <Pressable style={styles.avatar} onPress={navi}>
        <Avatar.Image source={avatarImg} size={40} />
      </Pressable>
    )}
  </>
);

export default function PostDetail() {
  const navigate = useNavigation();
  const inputRef = useRef(null);
  const [like, setLike] = useState();
  const route = useRoute();
  const [cmt, setCmt] = useState('');
  const [imgCmt, setImgCmt] = useState('');
  const dispatch = useDispatch();
  const [size, setSize] = useState('');
  const comments = useSelector(state => state.home.comments);
  const [total, setTotal] = useState(0);
  const [postData, setPostData] = useState('');
  const [user, setUser] = useState('');
  const curUser = useSelector(state => state.auth.user);
  const payload = {
    title: 'Bài viết của bạn đã có lượt thích mới',
    body: `${curUser.name} đã thích bài viết của bạn`,
    token: user.token,
    data: {
      article: route.params.postid,
    },
  };
  const gallery = () => {
    console.log('image');
    launchImageLibrary({mediaType: 'photo'}, props => {
      if (
        props.assets &&
        (props.assets[0].type === 'image/jpeg' ||
          props.assets[0].type === 'image/png' ||
          props.assets[0].type === 'image/jpg')
      ) {
        setImgCmt(props.assets[0]);
      }
    });
  };

  useEffect(() => {
    const post = async () => {
      if (route.params.postid) {
        const post = await firestore()
          .collection('post')
          .doc(route.params.postid)
          .get();
        const data = post.data();
        setPostData(data);
        const user = post.data().userId;
        const userData = await firestore().collection('user').doc(user).get();
        setUser(userData.data());
        const check = await post.data().like.includes(auth().currentUser.uid);
        setTotal(post.data().like.length);
        if (check) {
          setLike(true);
        } else {
          setLike(false);
        }
      }
    };
    // const likeupdate = firestore()
    //   .collection('post')
    //   .onSnapshot(() => {
    //     post();
    //   });
    // return likeupdate;
    post();
  }, []);

  useEffect(() => {
    const cmtSize = async () => {
      if (route.params.postid) {
        const size = await firestore()
          .collection('comments')
          .where('postId', '==', route.params.postid)
          .get();
        setSize(size.size);
      }
    };
    firestore()
      .collection('comments')
      .onSnapshot(() => {
        dispatch({type: GET_CMT});
        cmtSize();
      });
  }, []);

  const handleCmt = async () => {
    dispatch({
      type: CMT,
      payload: {
        text: cmt,
        uid: auth().currentUser.uid,
        postId: route.params.postid,
        imageCmt: imgCmt,
        curName: curUser.name,
      },
    });
    setCmt('');
    setImgCmt('');
  };

  const handleNavi = () => {
    if (user.id === auth().currentUser.uid) {
      navigate.navigate('Profile', {id: auth().currentUser.uid});
    } else {
      navigate.navigate('Profile-o', {id: user.id, name: user.name});
    }
  };

  const handleLike = async () => {
    const likes = firestore().collection('post').doc(route.params.postid);
    if (like) {
      setLike(false);
      setTotal(prev => prev - 1);
      likes.update({
        like: firestore.FieldValue.arrayRemove(auth().currentUser.uid),
      });
    } else {
      setLike(true);
      setTotal(prev => prev + 1);
      likes.update({
        like: firestore.FieldValue.arrayUnion(auth().currentUser.uid),
      });
      addNoti({
        postId: route.params.postid,
        type: 1,
      });
      if (user.token && user.token.length > 0) {
        notiMes(payload);
      }
    }
  };
  return user ? (
    <>
      <View style={styles.wrapper}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={styles.textHeader}>{user.name}'s post</Text>
            <Icon
              name="chevron-back"
              size={25}
              style={styles.iconHeader}
              onPress={() => {
                navigate.navigate('#');
              }}
            />
          </View>
          <View style={styles.container}>
            <Card.Title
              titleStyle={{fontSize: 16, fontWeight: '400'}}
              title={user.name}
              subtitle={moment(postData.createAt?.toDate()).fromNow()}
              left={() => LeftContent(user.avatar, handleNavi)}
            />
            {postData.content ? (
              <Card.Content style={styles.content}>
                <Paragraph>{postData.content}</Paragraph>
              </Card.Content>
            ) : null}
            {postData.imageUrl ? (
              <Pressable
                onPress={() => {
                  console.log('sdas');
                  dispatch({
                    type: MODAL_CHANGE_STATE,
                    payload: {image: postData.imageUrl},
                  });
                }}>
                <Card.Cover
                  style={styles.cover}
                  source={{uri: postData.imageUrl}}
                />
              </Pressable>
            ) : null}
            <View style={styles.infoPost}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AntDesignIcon
                  style={{
                    padding: 4,
                    backgroundColor: '#1777F2',
                    borderRadius: 999,
                  }}
                  color="white"
                  name="like1"
                  size={12}
                />
                <Text style={styles.like}>{total} </Text>
              </View>
              <Text style={styles.cmts}>
                {size > 1 ? size + '' + ' Comments' : size + '' + ' Comment'}
              </Text>
            </View>
            <Card.Actions style={styles.cardAction}>
              <Pressable style={styles.Icon} onPress={handleLike}>
                <View style={styles.actionBtn}>
                  <AntDesignIcon
                    color={like ? '#4169e1' : '#696969'}
                    name={!like ? 'like2' : 'like1'}
                    size={20}
                  />
                  <Text
                    style={[
                      styles.actionText,
                      {color: like ? '#4169e1' : '#696969'},
                    ]}>
                    Like
                  </Text>
                </View>
              </Pressable>
              <Pressable
                style={styles.Icon}
                onPress={() => inputRef.current.focus()}>
                <View style={styles.actionBtn}>
                  <FontistoIcon color="#696969" name="comment" size={20} />
                  <Text style={[styles.actionText, {color: '#696969'}]}>
                    Comment
                  </Text>
                </View>
              </Pressable>
              <Pressable
                style={styles.Icon}
                onPress={() => inputRef.current.focus()}>
                <View style={styles.actionBtn}>
                  <SimpleLineIcons name="share" color="#696969" size={20} />
                  <Text style={[styles.actionText, {color: '#696969'}]}>
                    Share
                  </Text>
                </View>
              </Pressable>
            </Card.Actions>
            <Card.Actions style={{marginTop: 8, paddingHorizontal: 10}}>
              <InputEncloseAvatar
                inputRef={inputRef}
                editable={true}
                placeholder="Write your comment..."
                change={e => setCmt(e)}
                content={cmt}
                postCmt={handleCmt}
                gallery={gallery}
                image={imgCmt}
                closeImg={() => setImgCmt(null)}
              />
            </Card.Actions>
            {comments &&
              comments
                .filter(item => item.postId === route.params.postid)
                .map(item => {
                  return (
                    <Comments
                      key={item.id}
                      time={moment(item.createAt?.toDate()).fromNow()}
                      content={item.content}
                      image={item.image}
                      userId={item.userId}
                    />
                  );
                })}
          </View>
        </ScrollView>
      </View>
    </>
  ) : (
    <SkeletonPlaceholder>
      <View style={styles.skeletonHeader}></View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <View style={styles.skeletonAvatar}></View>
        <View style={styles.skeletonName}></View>
      </View>
      <View style={styles.skeletonPost}></View>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <View style={styles.skeletonAvatarCmt}></View>
        <View style={styles.skeletonNameCmt}></View>
      </View>
    </SkeletonPlaceholder>
  );
}
