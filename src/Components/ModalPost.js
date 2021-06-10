import React, {useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  Modal,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import Post from './Modal';
import avatarImg from '../../assets/Img/avatar.png';
export default function ModalPost() {
  const [modal, setModal] = useState(false);
  const userData = useSelector(state => state.auth.user);
  const handlePress = () => {
    setModal(true);
  };

  const close = () => {
    setModal(false);
  };
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
      <Pressable style={{flex: 1}} onPress={handlePress}>
        <View style={styles.input}>
          <Text style={styles.text}>What's on your mind ?</Text>
          <Post type={modal} closeModal={close} />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 14,
    color: '#696969',
  },
  centeredView: {
    flex: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginLeft: 8,
    justifyContent: 'center',
  },
});
