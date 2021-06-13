import React, {useState} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';
import {log} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import avatarImg from '../../assets/Img/avatar.png';
import SendIcon from 'react-native-vector-icons/FontAwesome';
import GalleryIcon from 'react-native-vector-icons/Entypo';

export default function InputEncloseAvatar({
  editable,
  placeholder,
  inputRef,
  change,
  content,
  postCmt,
  gallery,
  image,
}) {
  const userData = useSelector(state => state.auth.user);
  return (
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
            color="#4169e1"
            size={20}
            onPress={postCmt}
          />
        ) : null}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
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
    paddingHorizontal: 10,
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
