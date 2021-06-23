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
import {CREATE_POST} from '../Home/constants';
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
  const [editText, setEditText] = useState('');
  const [editImg, setEditImg] = useState('');
  const gallery = () => {
    console.log('image');
    launchImageLibrary({mediaType: 'photo'}, props => {
      if (props.type === 'image/jpeg') {
        setImage(props);
      }
    });
  };
  const handlePost = () => {
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
  };

  const handleClose = () => {
    setImage(null);
  };

  const handleCloseImgCmt = () => {
    console.log(1);
    dispatch({type: CLOSE_IMG_CMT});
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
          if (props.type === 'image/jpeg') {
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
  console.log(imageCmt + '??????????????');
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
          onPress={() => dispatch({type: CLOSE_MODAL_POST})}
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
          <TextInput
            value={text}
            onChangeText={e => setText(e)}
            multiline={true}
            numberOfLines={4}
            style={styles.input}
            placeholderTextColor="#808080"
            placeholder="What's on your mind ?"
          />
          <View style={styles.imgWrapper}>
            {updateImg ? (
              <>
                <View style={styles.closeBtn}>
                  <Icon
                    onPress={handleClose}
                    name="close"
                    size={18}
                    color="white"
                  />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Image style={styles.img} source={image} />
                </ScrollView>
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
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Image style={styles.img} source={image} />
                </ScrollView>
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
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Image style={styles.img} source={imageCmt} />
                </ScrollView>
              </>
            ) : null}
          </View>
        </View>
        <CameraGroup cam={cam} gallery={gallery} />
        <View>
          <FButton handlePress={handlePost} Name="Post" />
        </View>
      </View>
    </Modal>
  );
}
