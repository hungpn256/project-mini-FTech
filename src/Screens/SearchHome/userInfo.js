import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {Avatar} from 'react-native-paper';
import avatarImg from '../../../assets/Img/avatar.png';
import {styles} from './styles';
export default function UserInfor({id, name, avatar}) {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate('Profile-o', {id, name})}>
      <View style={styles.user}>
        {avatar ? (
          <Avatar.Image
            size={45}
            source={{
              uri: avatar,
            }}
          />
        ) : (
          <Avatar.Image size={45} source={avatarImg} />
        )}
        <Text style={styles.userName}>{name}</Text>
      </View>
    </Pressable>
  );
}
