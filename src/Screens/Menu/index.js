import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  Text,
} from 'react-native';
import {Avatar, Card, Divider, List} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {LOGOUT} from '../Auth/constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {avatarDefault} from '../../index_Constant';
import styles from './styles';

export default function Menu({navigation}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const handleLogout = () => {
    dispatch({
      type: LOGOUT,
    });
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.wrapperBackground}>
          <ImageBackground
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/mini-project-a64a1.appspot.com/o/seamless-gold-rhombus-grid-pattern-black-background_53876-97589.jpg?alt=media&token=d6de4415-db4e-4b00-a67a-8c8c4045e399',
            }}
            style={styles.background}
          />
        </View>
        <View style={styles.menu}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('Profile');
            }}
            style={styles.wrapperAvatar}>
            <Avatar.Image
              source={{uri: user.avatar || avatarDefault}}
              size={140}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <View style={styles.main}>
            <Text style={styles.name}>{user.name}</Text>
            <Divider />
            <View style={{marginTop: 15}}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate('Friend');
                }}
                style={styles.item}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome name="users" size={22} color={'#1777f2'} />
                  <Text style={styles.itemTitle}>Friend</Text>
                </View>
                <MaterialIcons
                  name="navigate-next"
                  size={30}
                  color={'#717D7E'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate('Game');
                }}
                style={styles.item}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome name="gamepad" size={22} color={'#1777f2'} />
                  <Text style={styles.itemTitle}>Game</Text>
                </View>
                <MaterialIcons
                  name="navigate-next"
                  size={30}
                  color={'#717D7E'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate('Pay');
                }}
                style={styles.item}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Entypo name="wallet" size={22} color={'#1777f2'} />
                  <Text style={styles.itemTitle}>Pay</Text>
                </View>
                <MaterialIcons
                  name="navigate-next"
                  size={30}
                  color={'#717D7E'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  dispatch({type: LOGOUT});
                }}
                style={styles.item}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Entypo name="log-out" size={22} color={'#1777f2'} />
                  <Text style={styles.itemTitle}>Log out</Text>
                </View>
                <MaterialIcons
                  name="navigate-next"
                  size={30}
                  color={'#717D7E'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
