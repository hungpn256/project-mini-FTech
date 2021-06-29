import FButton from '@Components/TouchOpacity/index.js';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import avatarImg from '../../assets/Img/avatar.png';
import {CREATE_POST} from '../Screens/Home/constants';
import CameraGroup from './CameraGroup';
export default function Post({type, src, closeModal, closeImg}) {
  const [image, setImage] = useState(src);
  const [text, setText] = useState('');
  const loading = useSelector(state => state.home.postLoad);
  const userData = useSelector(state => state.auth.user);
  const id = userData.id;
  const dispatch = useDispatch();
  const handlePost = () => {
    dispatch({
      type: CREATE_POST,
      payload: {text, image, id},
    });
    setImage(null);
    setText(null);
  };

  const handleClose = () => {
    setImage(null);
  };

  const gallery = () => {
    console.log('image');
    launchImageLibrary({mediaType: 'photo'}, props => {
      if (props && props.type?.match('image')) {
        setImage(props);
      }
    });
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
          if (props && props.type?.match('image')) {
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
  console.log('loading' + loading);
  return type ? (
    <>
      <Modal animationType="fade">
        <Modal animationType="fade" visible={loading} transparent={true}>
          <View style={styles.viewModal}>
            <ActivityIndicator size="large" color="#4169e1" />
          </View>
        </Modal>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Create Post</Text>
          <Icon
            name="close"
            size={22}
            onPress={closeModal}
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
              {image && (
                <View style={styles.closeBtn}>
                  <Icon
                    onPress={handleClose}
                    name="close"
                    size={18}
                    color="white"
                  />
                </View>
              )}
              <ScrollView showsVerticalScrollIndicator={false}>
                <Image style={styles.img} source={image} />
              </ScrollView>
            </View>
          </View>
          <CameraGroup cam={cam} gallery={gallery} />
          <View>
            <FButton handlePress={handlePost} Name="Post" />
          </View>
        </View>
      </Modal>
    </>
  ) : null;
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    marginHorizontal: 0,
  },
  userName: {
    marginLeft: 10,
    color: 'black',
    fontSize: 16,
  },
  photoBtn: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hide: {
    display: 'none',
  },
  closeModal: {
    padding: 5,
    position: 'absolute',
    top: '50%',
    zIndex: 999,
    left: 0,
    marginLeft: 10,
  },
  img: {
    resizeMode: 'contain',
  },

  imgWrapper: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  inner: {
    position: 'relative',
    borderRadius: 15,
    padding: 20,
    flex: 1,
  },
  inputView: {
    flex: 1,
  },
  postGroup: {
    flex: 1,
  },
  header: {
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    position: 'relative',
  },
  text: {
    fontSize: 18,
    color: '#28313b',
  },
  textHeader: {
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
  },
  input: {
    borderRadius: 20,
    paddingVertical: 10,
    color: '#28313b',
  },
  actionBottom: {
    justifyContent: 'space-around',
  },
  colorText: {
    color: '#696969',
  },
  actionBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
  closeBtn: {
    padding: 5,
    borderRadius: 9999,
    position: 'absolute',
    backgroundColor: '#4169e1',
    top: -10,
    zIndex: 999,
    right: 4,
  },
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  viewModal: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
