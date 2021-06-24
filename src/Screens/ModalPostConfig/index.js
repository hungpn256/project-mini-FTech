import React, {useState} from 'react';
import {View, Text, Modal, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';
import FButton from '../../Components/TouchOpacity/index';
import {
  CLOSE_POST_CONFIG,
  OPEN_CONFIRM,
  CLOSE_CONFIRM,
} from '../ModalPostConfig/contants';
import {DELETE_POST} from '../Home/constants';
import Loading from '../../Components/Loading';
import {MODAL_UPDATE_POST} from '../ModalCreatePost/contants';
export default function index() {
  const status = useSelector(state => state.modalPostConfig.status);
  const confirm = useSelector(state => state.modalPostConfig.confirm);
  const postid = useSelector(state => state.modalPostConfig.postId);
  const loading = useSelector(state => state.home.postLoad);
  const dispatch = useDispatch();
  const handleShow = () => {
    dispatch({type: OPEN_CONFIRM});
    dispatch({type: CLOSE_POST_CONFIG});
  };

  const handleCancel = () => {
    dispatch({type: CLOSE_CONFIRM});
  };

  const handleConfirm = () => {
    dispatch({type: DELETE_POST, payload: {postId: postid}});
  };

  const handleEdit = () => {
    dispatch({type: MODAL_UPDATE_POST});
    dispatch({type: CLOSE_POST_CONFIG});
  };

  return (
    <>
      <Modal animationType="fade" transparent={true} visible={status}>
        <View style={styles.container}>
          <Pressable
            style={styles.inner}
            onPress={() => dispatch({type: CLOSE_POST_CONFIG})}></Pressable>
          <View style={styles.boxInner}>
            <Pressable onPress={handleEdit}>
              <Text style={[styles.btn, {marginBottom: 8}]}>Edit post</Text>
            </Pressable>
            <Pressable onPress={handleShow}>
              <Text style={styles.btn}>Delete post</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal visible={confirm} animationType="fade" transparent={true}>
        <Loading loading={loading} />
        <View style={styles.confirmWrapper}>
          <View style={styles.innerModal}>
            <Text style={{textAlign: 'center', fontSize: 16}}>
              Do you want to delete this post ?
            </Text>
            <View style={styles.confirm}>
              <View style={{marginRight: 3, flex: 1}}>
                <FButton Name="Confirm" handlePress={handleConfirm} />
              </View>
              <View style={{marginLeft: 3, flex: 1}}>
                <FButton Name="Cancel" handlePress={handleCancel} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
