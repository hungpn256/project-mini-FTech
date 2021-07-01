import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {CMT} from '@Screens/Home/constants';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Avatar, Card, Paragraph} from 'react-native-paper';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import ThreeDot from 'react-native-vector-icons/Entypo';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import avatarImg from '../../assets/Img/avatar.png';
import {addNoti, notiMes} from '../Screens/Notification/service';
import {OPEN_POST_CONFIG} from '../Screens/ModalPostConfig/contants';
import {OPEN_LIKE_MODAL} from '../Screens/ModalLike/constants';
import InputEncloseAvatar from './InputEncloseAvatar';
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

const Article = ({text, image, time, uid, postid}) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [like, setLike] = useState(false);
  const [cmt, setCmt] = useState('');
  const [imgCmt, setImgCmt] = useState('');
  const currentUser = auth().currentUser.uid;
  const curUser = useSelector(state => state.auth.user);
  const [content, setContent] = useState('');
  const [userCmt, setUserCmt] = useState('');
  const navigate = useNavigation();
  const [user, setUser] = useState('');
  const [size, setSize] = useState('');
  const [total, setTotal] = useState(0);
  const payload = {
    title: 'Bài viết của bạn đã có lượt thích mới',
    body: `${curUser.name} đã thích bài viết của bạn`,
    token: user.token,
    data: {
      article: postid,
    },
  };
  useEffect(() => {
    const userInfo = async () => {
      if (uid) {
        const users = await firestore().collection('user').doc(uid).get();
        setUser(users.data());
      }
    };
    userInfo();
  });

  useEffect(() => {
    const post = async () => {
      if (postid) {
        const post = await firestore().collection('post').doc(postid).get();
        const check = await post.data().like.includes(currentUser);
        setTotal(post.data().like.length);
        if (check) {
          setLike(true);
        } else {
          setLike(false);
        }
      }
    };

    firestore()
      .collection('post')
      .onSnapshot(() => {
        post();
      });
    // post();
  }, []);

  useEffect(() => {
    const lastCmt = async () => {
      if (postid) {
        const comments = await firestore()
          .collection('comments')
          .where('postId', '==', postid)
          .orderBy('createAt', 'desc')
          .limit(1)
          .get();
        if (comments.size > 0) {
          setContent(comments.docs[0].data());
          const userData = await firestore()
            .collection('user')
            .doc(comments.docs[0].data().userId)
            .get();
          setUserCmt(userData.data());
        }
      }
    };
    const cmtSize = async () => {
      if (postid) {
        const size = await firestore()
          .collection('comments')
          .where('postId', '==', postid)
          .get();
        setSize(size.size);
      }
    };
    // firestore()
    //   .collection('post')
    //   .onSnapshot(() => {
    //     post();
    //   });
    firestore()
      .collection('comments')
      .onSnapshot(() => {
        lastCmt();
        cmtSize();
      });
  }, []);
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

  const handleCmt = async () => {
    dispatch({
      type: CMT,
      payload: {
        text: cmt,
        uid: currentUser,
        curName: curUser.name,
        postId: postid,
        imageCmt: imgCmt,
      },
    });
    setCmt('');
    setImgCmt('');
    setUserCmt('');
  };

  const handleLike = () => {
    const likes = firestore().collection('post').doc(postid);
    if (like) {
      setLike(false);
      setTotal(prev => prev - 1);
      likes.update({like: firestore.FieldValue.arrayRemove(currentUser)});
    } else {
      setLike(true);
      setTotal(prev => prev + 1);
      likes.update({like: firestore.FieldValue.arrayUnion(currentUser)});
      addNoti({
        postId: postid,
        type: 1,
      });
      if (user.token && user.token.length > 0) {
        notiMes(payload);
      }
    }
  };
  const handleNavi = () => {
    if (uid === currentUser) {
      navigate.navigate('Profile', {id: uid});
    } else {
      navigate.navigate('Profile-o', {id: uid, name: user.name});
    }
  };

  const handleConfig = () => {
    dispatch({
      type: OPEN_POST_CONFIG,
      payload: {postId: postid, content: text, image: image},
    });
  };

  const handleLikeModal = () => {
    dispatch({type: OPEN_LIKE_MODAL, payload: {postId: postid}});
  };

  return user ? (
    <Card style={styles.container}>
      <Card.Title
        titleStyle={{fontSize: 16, fontWeight: '400'}}
        title={user.name}
        subtitle={time}
        left={() => LeftContent(user.avatar, handleNavi)}
        right={() => (
          <View style={{paddingRight: 10}}>
            {auth().currentUser.uid === uid ? (
              <ThreeDot
                size={19}
                name="dots-three-horizontal"
                color="#696969"
                onPress={handleConfig}
              />
            ) : (
              <Text></Text>
            )}
          </View>
        )}
      />
      <Pressable
        onPress={() =>
          navigate.navigate('PostDetail', {
            postid: postid,
          })
        }>
        {text ? (
          <Card.Content style={styles.content}>
            <Paragraph>{text}</Paragraph>
          </Card.Content>
        ) : null}
        {image ? (
          <Card.Cover style={styles.cover} source={{uri: image}} />
        ) : null}
      </Pressable>
      <View style={styles.infoPost}>
        <Pressable
          onPress={() => handleLikeModal()}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <AntDesignIcon
            style={{
              padding: 4,
              backgroundColor: '#1777F2',
              borderRadius: 999,
            }}
            color="white"
            name="like1"
            size={11}
          />
          <Text style={styles.like}>{total < 0 ? 0 : total} </Text>
        </Pressable>

        <Text
          onPress={() =>
            navigate.navigate('PostDetail', {
              postid: postid,
            })
          }
          style={styles.cmts}>
          {size > 1 ? size + '' + ' Comments' : size + '' + ' Comment'}
        </Text>
      </View>
      <Card.Actions style={styles.cardAction}>
        <Pressable style={styles.Icon} onPress={handleLike}>
          <View style={styles.actionBtn}>
            <AntDesignIcon
              color={like ? '#1777F2' : '#696969'}
              name={!like ? 'like2' : 'like1'}
              size={20}
            />
            <Text
              style={[
                styles.actionText,
                {color: like ? '#1777F2' : '#696969'},
              ]}>
              Like
            </Text>
          </View>
        </Pressable>
        <Pressable style={styles.Icon} onPress={() => inputRef.current.focus()}>
          <View style={styles.actionBtn}>
            <FontistoIcon color="#696969" name="comment" size={18} />
            <Text style={[styles.actionText, {color: '#696969'}]}>Comment</Text>
          </View>
        </Pressable>
        <Pressable style={styles.Icon} onPress={() => inputRef.current.focus()}>
          <View style={styles.actionBtn}>
            <MaterialCommunityIcons
              name="share-outline"
              color="#696969"
              size={20}
            />
            <Text style={[styles.actionText, {color: '#696969'}]}>Share</Text>
          </View>
        </Pressable>
      </Card.Actions>
      <Card.Actions style={{marginVertical: 8}}>
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
      {content ? (
        <Pressable
          onPress={() =>
            navigate.navigate('PostDetail', {
              postid: postid,
            })
          }>
          <View style={styles.cmtWrapper}>
            <View style={styles.AvatarCmt}>
              {userCmt.avatar ? (
                <Avatar.Image source={{uri: userCmt.avatar}} size={40} />
              ) : (
                <Avatar.Image source={avatarImg} size={40} />
              )}
              <View style={styles.cmt}>
                <Text style={styles.userName}>{userCmt.name}</Text>
                {content.content ? <Text>{content.content}</Text> : null}
              </View>
            </View>

            <View style={styles.cmtGroup}>
              {content.image ? (
                <>
                  <Image style={styles.imgCmt} source={{uri: content.image}} />
                </>
              ) : null}
              <Text style={{color: '#696969', fontSize: 12, marginLeft: 5}}>
                {content.createAt
                  ? moment(content.createAt?.toDate()).fromNow()
                  : 'loading'}
              </Text>
            </View>
          </View>
        </Pressable>
      ) : null}
    </Card>
  ) : null;
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  avatar: {
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 999,
    position: 'absolute',
  },
  cmts: {
    color: '#696969',
    fontSize: 13,
  },
  like: {
    color: '#696969',
    marginLeft: 3,
    fontSize: 13,
  },
  infoPost: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  AvatarCmt: {
    flexDirection: 'row',
  },
  cover: {
    height: windowHeight * 0.4,
  },
  imgCmt: {
    borderRadius: 12,
    width: windowWidth * 0.4,
    height: windowHeight * 0.3,
  },
  cmtGroup: {marginTop: 2, marginLeft: 50},
  userName: {
    fontWeight: 'bold',
  },
  cmtWrapper: {
    flex: 1,
    padding: 10,
    marginBottom: 5,
  },
  cmt: {
    marginLeft: 8,
    padding: 10,
    borderRadius: 18,
    paddingHorizontal: 10,
    backgroundColor: '#f0f2f5',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  Icon: {
    flex: 1,
  },
  //#A4A4A4
  //#4169e1
  actionText: {
    fontSize: 15,
    marginLeft: 5,
    fontWeight: '700',
  },
  content: {
    marginBottom: 8,
  },
  cardAction: {
    justifyContent: 'space-evenly',
    borderBottomColor: '#F1F1F1',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: '#F1F1F1',
    paddingVertical: 7,
  },
});
export default React.memo(Article);
