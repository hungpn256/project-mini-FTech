import React, {useState, useRef, useEffect} from 'react';
import {View, Text, Pressable, ScrollView, Image} from 'react-native';
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
import {MODAL_CHANGE_STATE} from '@Screens/Modal/constant';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
const LeftContent = img => (
  <>
    {img ? (
      <Avatar.Image source={{uri: img}} size={40} />
    ) : (
      <Avatar.Image source={avatarImg} size={40} />
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
  const gallery = () => {
    console.log('image');
    launchImageLibrary({mediaType: 'photo'}, props => {
      if (props.type === 'image/jpeg') {
        setImgCmt(props);
      }
    });
  };

  useEffect(() => {
    dispatch({type: GET_CMT});
    const cmtSize = async () => {
      if (route.params.postid) {
        const size = await firestore()
          .collection('comments')
          .where('postId', '==', route.params.postid)
          .get();
        setSize(size.size);
      }
    };
    cmtSize();
  }, [comments.length]);

  const handleCmt = async () => {
    dispatch({
      type: CMT,
      payload: {
        text: cmt,
        uid: route.params.currentUser,
        postId: route.params.postid,
        imageCmt: imgCmt,
      },
    });
    setCmt('');
    setImgCmt('');
  };
  return (
    <View style={styles.wrapper}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.textHeader}>{route.params.name}'s post</Text>
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
            title={route.params.name}
            subtitle={route.params.time}
            left={() => LeftContent(route.params.avatar)}
          />
          {route.params.text ? (
            <Card.Content style={styles.content}>
              <Paragraph>{route.params.text}</Paragraph>
            </Card.Content>
          ) : null}
          {route.params.image ? (
            <Pressable
              onPress={() => {
                console.log('sdas');
                dispatch({
                  type: MODAL_CHANGE_STATE,
                  payload: {image: route.params.image},
                });
              }}>
              <Card.Cover
                style={styles.cover}
                source={{uri: route.params.image}}
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
              <Text style={styles.like}>1 </Text>
            </View>
            <Text style={styles.cmts}>
              {size > 1 ? size + '' + ' Comments' : size + '' + ' Comment'}
            </Text>
          </View>
          <Card.Actions style={styles.cardAction}>
            <Pressable
              style={styles.Icon}
              onPress={() => setLike(like => !like)}>
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
  );
}
