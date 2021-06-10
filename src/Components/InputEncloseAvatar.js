import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';
import {log} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import avatarImg from '../../assets/Img/avatar.png';
export default function InputEncloseAvatar({
  editable,
  placeholder,
  inputRef,
  onPresss,
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
        editable={!!editable}
        multiline={true}
        onPress={() => {}}
        // onPress={onPresss}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 8,
    padding: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
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
