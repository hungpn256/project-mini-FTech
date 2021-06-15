import React, {useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import {log} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import avatarImg from '../../assets/Img/avatar.png';
import SendIcon from 'react-native-vector-icons/FontAwesome';
import GalleryIcon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/AntDesign';
export default function InputEncloseAvatar({
  editable,
  placeholder,
  inputRef,
  change,
  content,
  postCmt,
  gallery,
  closeImg,
  image,
}) {
  const windowHeight = Dimensions.get('window').height;
  const userData = useSelector(state => state.auth.user);
  return (
    <View style={{flex: 1}}>
      <View style={styles.inputWrapper}>
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
        <View style={styles.groupCmt}>
          <View style={styles.inputCmt}>
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder={placeholder}
              editable={editable}
              multiline={true}
              onChangeText={change}
              value={content}
              // onPress={onPresss}
            />

            <View style={styles.gallery}>
              <GalleryIcon
                onPress={gallery}
                name="folder-images"
                size={20}
                color="#696969"
              />
            </View>
          </View>
          {content.length > 0 || image ? (
            <SendIcon
              style={{marginLeft: 10}}
              name="send"
              color="#1777F2"
              size={20}
              onPress={postCmt}
            />
          ) : null}
        </View>
      </View>
      {image ? (
        <View
          style={{
            paddingVertical: 10,
            flex: 1,
            // position: 'relative',
            height: windowHeight * 0.4,
            justifyContent: 'flex-start',
            position: 'relative',
          }}>
          <Icon name="close" size={20} style={styles.icon} onPress={closeImg} />
          <Image
            source={image}
            style={{
              borderRadius: 18,
              resizeMode: 'contain',
              height: '100%',
              width: '50%',
              flex: 1,
            }}
          />
        </View>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  icon: {
    position: 'absolute',
    left: '50%',
    top: 10,
    backgroundColor: '#4169e1',
    zIndex: 999,
    color: 'white',
    padding: 5,
    borderRadius: 999,
  },
  inputCmt: {
    flex: 1,
    position: 'relative',
  },
  gallery: {
    position: 'absolute',
    top: 0,
    right: 15,
    bottom: 0,
    justifyContent: 'center',
  },
  groupCmt: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginLeft: 8,
    paddingVertical: 7,
    paddingHorizontal: 20,
  },
});
