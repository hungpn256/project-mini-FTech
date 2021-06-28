import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import {avatarDefault} from '../../../index_Constant';
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
