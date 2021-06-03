import FButton from '@Components/TouchOpacity/index.js';
import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Avatar, Button, Card, Divider} from 'react-native-paper';
import InputEncloseAvatar from './InputEncloseAvatar';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalPost from './ModalPost';
export default function Post({type, src, closeModal, closeImg}) {
  const [image, setImage] = useState(src);

  const handlePost = () => {};

  const handleClose = () => {
    setImage(null);
  };

  const handleCloseModal = () => {
    setStatus(false);
  };

  return type ? (
    <>
      <Modal transparent={true}>
        <View style={styles.container}>
          <View style={styles.inner}>
            <View style={styles.closeModal}>
              <Icon onPress={closeModal} name="close" size={18} />
            </View>
            <View style={styles.header}>
              <Text style={styles.text}>Create Post</Text>
            </View>
            <View style={styles.inputView}>
              <ScrollView>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  style={styles.input}
                  placeholderTextColor="#808080"
                  placeholder="What's on your mind"
                />
                <View style={styles.imgWrapper}>
                  {image && (
                    <View style={styles.closeBtn}>
                      <Icon onPress={handleClose} name="close" size={16} />
                    </View>
                  )}
                  <View>
                    <Image style={styles.img} source={image} />
                  </View>
                </View>
              </ScrollView>
            </View>
            <View style={styles.photoBtn}>
              <Button
                style={styles.actionBtn}
                icon="camera"
                color="#777"
                onPress={async e => {
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
                          setStatus(true);
                        }
                      });
                    } else {
                      console.log('Camera permission denied');
                    }
                  } catch (err) {
                    console.warn(err);
                  }
                }}>
                <Text style={styles.colorText}>Camera</Text>
              </Button>
              <Button
                style={styles.actionBtn}
                icon="folder-image"
                color="#777"
                onPress={() => {
                  console.log('image');
                  launchImageLibrary({mediaType: 'photo'}, props => {
                    if (props.type === 'image/jpeg') {
                      setImage(props);
                      setStatus(true);
                    }
                  });
                }}>
                <Text style={styles.colorText}>Photo/Video</Text>
              </Button>
            </View>
            <View>
              <FButton Name="Post" />
            </View>
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
    alignItems: 'center',
    padding: 15,
    flex: 1,
    marginHorizontal: 0,
    backgroundColor: 'rgba(0, 0, 0, .6)',
  },
  photoBtn: {
    flexDirection: 'row',
  },
  hide: {
    display: 'none',
  },
  closeModal: {
    padding: 5,
    borderRadius: 9999,
    position: 'absolute',
    backgroundColor: '#f0f0f0',
    top: -7,
    zIndex: 999,
    right: 0,
  },
  img: {
    flex: 1,
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 16,
  },
  imgWrapper: {
    borderRadius: 16,
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight * 0.6,
  },
  inner: {
    position: 'relative',
    borderRadius: 15,
    padding: 20,
    backgroundColor: '#dee3de',
    flex: 1,
    width: windowWidth * 0.85,
  },
  inputView: {
    flex: 1,
  },
  postGroup: {
    flex: 1,
  },
  header: {
    padding: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#28313b',
  },
  input: {
    borderRadius: 20,
    padding: 10,
    color: 'white',
  },
  actionBottom: {
    justifyContent: 'space-around',
    paddingVertical: 0,
  },
  colorText: {
    color: '#000',
    height: '100%',
  },
  actionBtn: {
    paddingTop: 8,
  },
  closeBtn: {
    padding: 5,
    borderRadius: 9999,
    position: 'absolute',
    backgroundColor: '#f0f0f0',
    top: -7,
    zIndex: 999,
    right: 4,
  },
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});
