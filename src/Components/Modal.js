import FButton from '@Components/TouchOpacity/index.js';
import React, {useState} from 'react';
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
export default function Post({status, src}) {
  const [image, setImage] = useState(null);
  return (
    <>
      <Modal transparent={true}>
        <View style={styles.container}>
          <View style={styles.inner}>
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
                  <Image style={styles.img} source={src} />
                </View>
              </ScrollView>
            </View>
            <View>
              <FButton Name="Post" />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 15,
    flex: 1,
    marginHorizontal: 0,
    backgroundColor: 'rgba(0, 0, 0, .5)',
  },
  img: {
    flex: 1,
    height: windowHeight * 0.8,
  },
  imgWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    borderRadius: 15,
    padding: 20,
    backgroundColor: '#181A18',
    flex: 1,
    width: windowWidth * 0.9,
  },
  inputView: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 15,
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
    color: 'white',
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
  imageWrapper: {
    marginTop: 15,
    position: 'relative',
    height: 100,
    width: 100,
  },
  closeBtn: {
    padding: 5,
    borderRadius: 999,
    position: 'absolute',
    backgroundColor: '#f0f0f0',
    top: -5,
    right: 5,
  },
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});
