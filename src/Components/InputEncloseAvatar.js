import React, {useState} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';
import {log} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import avatarImg from '../../assets/Img/avatar.png';
import SendIcon from 'react-native-vector-icons/FontAwesome';
export default function InputEncloseAvatar({
  editable,
  placeholder,
  inputRef,
  change,
  content,
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
      {content.length > 0 ? (
        <SendIcon
          style={{marginLeft: 10}}
          name="send"
          color="#4169e1"
          size={20}
        />
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginLeft: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
});
