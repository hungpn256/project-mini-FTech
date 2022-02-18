import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import {avatarDefault} from '../../../index_Constant';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../styles';
const PersonRequest = ({item, accept, deleteFriend, isFriend}) => {
  const [accepted, setAccepted] = useState(isFriend || 0);
  const navigation = useNavigation();
  return (
    <View style={styles.wrapperUser}>
      <Pressable
        onPress={() => {
          navigation.navigate('Profile-o', {id: item.id, name: item.name});
        }}>
        <View style={{borderWidth: 1, borderColor: '#eee', borderRadius: 999}}>
          <Avatar.Image
            source={{uri: item.avatar || avatarDefault}}
            size={65}
          />
          <View
            style={{
              position: 'absolute',
              backgroundColor: '#1777F2',
              borderRadius: 999,
              bottom: 4,
              right: -4,
            }}>
            <FontAwesome
              name="user-plus"
              color="#fff"
              style={{padding: 5}}
              size={13}
            />
          </View>
        </View>
      </Pressable>
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
                  setAccepted(1);
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
