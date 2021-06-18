import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import {avatarDefault} from '../../../index_Constant';
import styles from '../styles';
const PersonRequest = ({item, accept, deleteFriend}) => {
  const [accepted, setAccepted] = useState(0);
  return (
    <View style={styles.wrapperUser}>
      <Avatar.Image source={{uri: item.avatar || avatarDefault}} size={80} />
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.action}>
          {accepted === 1 ? (
            <Button
              style={[styles.btn, {width: '60%'}]}
              mode="contained"
              onPress={() => {
                setAccepted(2);
                deleteFriend(item);
              }}
              color="#ddd">
              Remove
            </Button>
          ) : accepted === 0 ? (
            <>
              <Button
                style={styles.btn}
                mode="contained"
                color="#1454FF"
                onPress={() => {
                  accept(item);
                  setAccepted(true);
                }}>
                Comfirm
              </Button>
              <Button
                style={styles.btn}
                mode="contained"
                color="#ddd"
                onPress={() => {
                  setAccepted(2);
                  deleteFriend(item);
                }}>
                Delete
              </Button>
            </>
          ) : (
            <Button
              style={[styles.btn, {width: '60%'}]}
              mode="text"
              icon="check"
              color="red">
              removed
            </Button>
          )}
        </View>
      </View>
    </View>
  );
};

export default PersonRequest;
