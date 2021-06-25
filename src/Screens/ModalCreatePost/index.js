import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  ScrollView,
  Image,
  PermissionsAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CLOSE_MODAL_POST, CLOSE_IMG_CMT} from './contants';
import Icon from 'react-native-vector-icons/AntDesign';
import CameraGroup from '../../Components/CameraGroup';
import {Avatar, Button, Card, Divider} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {styles} from './styles';
import avatarImg from '../../../assets/Img/avatar.png';
import FButton from '../../Components/TouchOpacity/index';
import Loading from '../../Components/Loading';
import {CREATE_POST, UPDATE_POST} from '../Home/constants';
import {CLOSE_UPDATE_IMG, CLEAR_UPDATE_TEXT} from '../ModalPostConfig/contants';
export default function index() {
  const modal = useSelector(state => state.modalCreatePost.status);
  const imageCmt = useSelector(state => state.modalCreatePost.image);
  const userData = useSelector(state => state.auth.user);
  const loading = useSelector(state => state.home.postLoad);
  const checkUpdate = useSelector(state => state.modalCreatePost.update);
  const updateText = useSelector(state => state.modalPostConfig.content);
  const updateImg = useSelector(state => state.modalPostConfig.image);
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const postid = useSelector(state => state.modalPostConfig.postId);
  const gallery = () => {
    console.log('image');
    launchImageLibrary({mediaType: 'photo'}, props => {
      if (
        props.type === 'image/jpeg' ||
        props.type === 'image/png' ||
        props.type === 'image/jpg'
      ) {
        setImage(props);
      }
    });
  };
  const handlePost = () => {
    if (checkUpdate) {
      dispatch({
        type: UPDATE_POST,
        payload: {postId: postid, content: text},
      });
      setText(null);
    } else {
      console.log('create');
      if (imageCmt !== null) {
        let image = imageCmt;
        dispatch({
          type: CREATE_POST,
          payload: {text, image},
        });
      } else {
        dispatch({
          type: CREATE_POST,
          payload: {text, image},
        });
        setImage(null);
      }
      setText(null);
    }
  };

  const handleClose = () => {
    setImage(null);
  };

  const handleCloseImgCmt = () => {
    console.log(1);
    dispatch({type: CLOSE_IMG_CMT});
  };
  const handleCloseUpdateCmt = () => {
    dispatch({type: CLOSE_UPDATE_IMG});
  };

  const cam = async () => {
    console.log('Camera');
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchCamera({mediaType: 'photo'}, props => {
          if (
            props.type === 'image/jpeg' ||
            props.type === 'image/png' ||
            props.type === 'image/jpg'
          ) {
            setImage(props);
          }
        });
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  console.log(updateImg + '??????????????');
  return (
    <Modal animationType="fade" visible={modal}>
      <Loading loading={loading} />
      <View style={styles.header}>
        <Text style={styles.textHeader}>
          {checkUpdate ? 'Edit post' : ' Create Post'}
        </Text>
        <Icon
          name="close"
          size={22}
          onPress={() => {
            dispatch({type: CLOSE_MODAL_POST});
            dispatch({type: CLOSE_UPDATE_IMG});
            dispatch({type: CLEAR_UPDATE_TEXT});
          }}
          style={styles.closeModal}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.groupInfo}>
          {userData.avatar ? (
            <Avatar.Image
              size={40}
              source={{
                uri: userData.avatar,
              }}
            />
          ) : (
            <Avatar.Image size={40} source={avatarImg} />
          )}
          <Text style={styles.userName}>{userData.name}</Text>
        </View>
        <View style={styles.inputView}>
          {updateText ? (
            <>
              <Text style={{color: '#696969', marginTop: 10}}>
                Previous content: {updateText}
              </Text>
              <TextInput
                value={text}
                onChangeText={e => setText(e)}
                multiline={true}
                numberOfLines={4}
                style={styles.input}
                placeholderTextColor="#808080"
                placeholder="What's on your mind ?"
              />
            </>
          ) : (
            <TextInput
              value={text}
              onChangeText={e => setText(e)}
              multiline={true}
              numberOfLines={4}
              style={styles.input}
              placeholderTextColor="#808080"
              placeholder="What's on your mind ?"
            />
          )}

          <View style={styles.imgWrapper}>
            {updateImg ? (
              <>
                {/* <View style={styles.closeBtn}>
                  <Icon
                    onPress={handleCloseUpdateCmt}
                    name="close"
                    size={18}
                    color="white"
                  />
                </View> */}
                <Image style={styles.img} source={{uri: updateImg}} />
              </>
            ) : null}
            {image ? (
              <>
                <View style={styles.closeBtn}>
                  <Icon
                    onPress={handleClose}
                    name="close"
                    size={18}
                    color="white"
                  />
                </View>
                <Image style={styles.img} source={image} />
              </>
            ) : null}
            {imageCmt ? (
              <>
                <View style={styles.closeBtn}>
                  <Icon
                    onPress={handleCloseImgCmt}
                    name="close"
                    size={18}
                    color="white"
                  />
                </View>
                <Image style={styles.img} source={imageCmt} />
              </>
            ) : null}
          </View>
        </View>
        {!checkUpdate ? <CameraGroup cam={cam} gallery={gallery} /> : null}

        <View>
          <FButton handlePress={handlePost} Name="Post" />
        </View>
      </View>
    </Modal>
  );
}
