import React from 'react';
import {Modal, StyleSheet, Image, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import GestureRecognizer from 'react-native-swipe-gestures';
import {MODAL_CHANGE_STATE} from './constant';
export default function ModalComponent() {
  const image = useSelector(state => state.modal.image);
  console.log('image', image);
  const dispatch = useDispatch();
  return (
    <Modal
      visible={!!image}
      animationType="slide"
      onRequestClose={() => {
        dispatch({type: MODAL_CHANGE_STATE, payload: {image: null}});
      }}>
      <GestureRecognizer
        style={{flex: 1}}
        onSwipeDown={() => {
          dispatch({type: MODAL_CHANGE_STATE, payload: {image: null}});
        }}>
        <Image style={styles.image} source={{uri: image}} />
        <Pressable
          onPress={() => {
            dispatch({type: MODAL_CHANGE_STATE, payload: {image: null}});
          }}
          style={styles.close}>
          <AntDesign name="close" size={20} color="#fff" />
        </Pressable>
      </GestureRecognizer>
    </Modal>
  );
}
const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  close: {
    position: 'absolute',
    right: 10,
    top: 10,
    padding: 3,
    backgroundColor: '#1777f2',
    borderRadius: 999,
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1,
  },
});
