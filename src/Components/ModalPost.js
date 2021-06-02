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
import Post from './Modal';
export default function ModalPost() {
  const [modal, setModal] = useState(false);

  const handlePress = () => {
    setModal(true);
  };

  return (
    <View style={styles.inputWrapper}>
      <Avatar.Image
        size={45}
        source={{
          uri: 'https://scontent.fhan4-1.fna.fbcdn.net/v/t1.6435-1/p160x160/69198146_1346843938816773_7149406761399615488_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=7206a8&_nc_ohc=T2HIPc3q7xIAX_ZdU2e&_nc_ht=scontent.fhan4-1.fna&tp=6&oh=1d695792abaf91545e01681f2983b0f6&oe=60C319FF',
        }}
      />
      <View style={styles.input}>
        <Text onPress={handlePress}>What's on your mind</Text>
        {modal && <Post />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 8,
    padding: 8,
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
    backgroundColor: '#f0f0f0',
    marginLeft: 8,
    paddingVertical: 15,
    paddingHorizontal: 12,
  },
});
