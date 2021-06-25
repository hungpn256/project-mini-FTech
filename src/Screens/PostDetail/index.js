import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import avatarImg from '../../../assets/Img/avatar.png';
import {Avatar, Card, Paragraph, Title, Button} from 'react-native-paper';
import InputEncloseAvatar from '../../Components/InputEncloseAvatar';
import Comments from '../../Components/Comments';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useRoute} from '@react-navigation/native';
import {CMT, GET_CMT} from '@Screens/Home/constants';
import Loading from '../../Components/Loading/index';
import {MODAL_CHANGE_STATE} from '@Screens/Modal/constant';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import auth, {firebase} from '@react-native-firebase/auth';
import moment from 'moment';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
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

export default function index() {
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
  const [status, setStatus] = useState('');
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  const gallery = () => {
    console.log('image');
    launchImageLibrary({mediaType: 'photo'}, props => {
      if (
        props.type === 'image/jpeg' ||
        props.type === 'image/png' ||
        props.type === 'image/jpg'
      ) {
        setImgCmt(props);
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
    const cmtupdate = firestore()
      .collection('comments')
      .onSnapshot(() => {
        dispatch({type: GET_CMT});
        cmtSize();
      });
    return cmtupdate;
  }, []);

  const handleCmt = async () => {
    dispatch({
      type: CMT,
      payload: {
        text: cmt,
        uid: auth().currentUser.uid,
        postId: route.params.postid,
        imageCmt: imgCmt,
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
    }
  };
  return (
    <SkeletonPlaceholder>
      <View style={styles.skeletonHeader}></View>
    </SkeletonPlaceholder>

    // <View style={styles.wrapper}>
    //   <ScrollView
    //     showsVerticalScrollIndicator={false}
    //     keyboardShouldPersistTaps="handled">
    //     <View style={styles.header}>
    //       <Text style={styles.textHeader}>{user.name}'s post</Text>
    //       <Icon
    //         name="chevron-back"
    //         size={25}
    //         style={styles.iconHeader}
    //         onPress={() => {
    //           navigate.navigate('#');
    //         }}
    //       />
    //     </View>
    //     <View style={styles.container}>
    //       <Card.Title
    //         titleStyle={{fontSize: 16, fontWeight: '400'}}
    //         title={user.name}
    //         subtitle={moment(postData.createAt?.toDate()).fromNow()}
    //         left={() => LeftContent(user.avatar, handleNavi)}
    //       />
    //       {postData.content ? (
    //         <Card.Content style={styles.content}>
    //           <Paragraph>{postData.content}</Paragraph>
    //         </Card.Content>
    //       ) : null}
    //       {postData.imageUrl ? (
    //         <Pressable
    //           onPress={() => {
    //             console.log('sdas');
    //             dispatch({
    //               type: MODAL_CHANGE_STATE,
    //               payload: {image: postData.imageUrl},
    //             });
    //           }}>
    //           <Card.Cover
    //             style={styles.cover}
    //             source={{uri: postData.imageUrl}}
    //           />
    //         </Pressable>
    //       ) : null}
    //       <View style={styles.infoPost}>
    //         <View style={{flexDirection: 'row', alignItems: 'center'}}>
    //           <AntDesignIcon
    //             style={{
    //               padding: 4,
    //               backgroundColor: '#1777F2',
    //               borderRadius: 999,
    //             }}
    //             color="white"
    //             name="like1"
    //             size={12}
    //           />
    //           <Text style={styles.like}>{total} </Text>
    //         </View>
    //         <Text style={styles.cmts}>
    //           {size > 1 ? size + '' + ' Comments' : size + '' + ' Comment'}
    //         </Text>
    //       </View>
    //       <Card.Actions style={styles.cardAction}>
    //         <Pressable style={styles.Icon} onPress={handleLike}>
    //           <View style={styles.actionBtn}>
    //             <AntDesignIcon
    //               color={like ? '#4169e1' : '#696969'}
    //               name={!like ? 'like2' : 'like1'}
    //               size={20}
    //             />
    //             <Text
    //               style={[
    //                 styles.actionText,
    //                 {color: like ? '#4169e1' : '#696969'},
    //               ]}>
    //               Like
    //             </Text>
    //           </View>
    //         </Pressable>
    //         <Pressable
    //           style={styles.Icon}
    //           onPress={() => inputRef.current.focus()}>
    //           <View style={styles.actionBtn}>
    //             <FontistoIcon color="#696969" name="comment" size={20} />
    //             <Text style={[styles.actionText, {color: '#696969'}]}>
    //               Comment
    //             </Text>
    //           </View>
    //         </Pressable>
    //         <Pressable
    //           style={styles.Icon}
    //           onPress={() => inputRef.current.focus()}>
    //           <View style={styles.actionBtn}>
    //             <SimpleLineIcons name="share" color="#696969" size={20} />
    //             <Text style={[styles.actionText, {color: '#696969'}]}>
    //               Share
    //             </Text>
    //           </View>
    //         </Pressable>
    //       </Card.Actions>
    //       <Card.Actions style={{marginTop: 8, paddingHorizontal: 10}}>
    //         <InputEncloseAvatar
    //           inputRef={inputRef}
    //           editable={true}
    //           placeholder="Write your comment..."
    //           change={e => setCmt(e)}
    //           content={cmt}
    //           postCmt={handleCmt}
    //           gallery={gallery}
    //           image={imgCmt}
    //           closeImg={() => setImgCmt(null)}
    //         />
    //       </Card.Actions>
    //       {comments &&
    //         comments
    //           .filter(item => item.postId === route.params.postid)
    //           .map(item => {
    //             return (
    //               <Comments
    //                 key={item.id}
    //                 time={moment(item.createAt?.toDate()).fromNow()}
    //                 content={item.content}
    //                 image={item.image}
    //                 userId={item.userId}
    //               />
    //             );
    //           })}
    //     </View>
    //   </ScrollView>
    // </View>
  );
}
