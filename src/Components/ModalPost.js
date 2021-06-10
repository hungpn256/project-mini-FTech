import React, {useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  Modal,
  ActivityIndicator,
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
      <View style={styles.input}>
        <Text style={styles.text} onPress={handlePress}>
          What's on your mind ?
        </Text>
        <Post type={modal} closeModal={close} />
      </View>
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
    borderRadius: 20,
    marginLeft: 8,
  },
});
