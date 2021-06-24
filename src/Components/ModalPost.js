import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import avatarImg from '../../assets/Img/avatar.png';
import {MODAL_CREATE_POST} from '../Screens/ModalCreatePost/contants';
export default function ModalPost() {
  const [modal, setModal] = useState(false);
  const userData = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
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
      <Pressable
        style={{flex: 1}}
        onPress={() => dispatch({type: MODAL_CREATE_POST})}>
        <View style={styles.input}>
          <Text style={styles.text}>What's on your mind ?</Text>
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
