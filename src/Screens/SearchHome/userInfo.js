import React from 'react';
import {View, Text, TextInput, Pressable} from 'react-native';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {Avatar} from 'react-native-paper';
import avatarImg from '../../../assets/Img/avatar.png';
import {useNavigation} from '@react-navigation/native';
export default function index({id, name, avatar}) {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate('Profile-o', {id})}>
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
