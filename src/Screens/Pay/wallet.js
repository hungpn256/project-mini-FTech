import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
<<<<<<< HEAD
  Dimensions,
  Image,
} from 'react-native';
import {Divider} from 'react-native-paper';
import {useSelector} from 'react-redux';

=======
  View,
} from 'react-native';
import {Avatar, Divider} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {avatarDefault} from '../../index_Constant';
>>>>>>> 38f489d66aad9839e3c3a580f7a790d01e95c93a
const windowWidth = Dimensions.get('window').width;
const ItemMenu = props => {
  return (
    <View style={styles.viewTouchopacityBody}>
      <TouchableOpacity style={styles.touchOpacityBody}>
        <Text>{props.text}</Text>
      </TouchableOpacity>
      <Divider />
    </View>
  );
};
const Wallet = () => {
<<<<<<< HEAD
  const userWallet = useSelector(state => state.auth.user);
  const avatar = userWallet.avatar;
=======
  const user = useSelector(state => state.auth.user);
>>>>>>> 38f489d66aad9839e3c3a580f7a790d01e95c93a
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.touchOpacityHeader}>
<<<<<<< HEAD
          <Image
            style={styles.avatar}
            source={{
              uri: userWallet.avatar,
            }}
          />
          <View style={styles.viewInfo}>
            <Text style={styles.textName}>{userWallet.name}</Text>
=======
          <View style={styles.viewAvata}>
            <Avatar.Image
              style={styles.avata}
              source={{uri: user.avatar || avatarDefault}}
              size={80}
            />
          </View>
          <View style={styles.viewInfo}>
            <Text style={{fontSize: 18, fontWeight: '700', paddingBottom: 10}}>
              {user.name}
            </Text>
>>>>>>> 38f489d66aad9839e3c3a580f7a790d01e95c93a
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <ItemMenu text=" Lịch sử giao dịch" />
        <ItemMenu text=" Cài đặt" />
        <ItemMenu text=" Trung tâm trợ giúp" />
        <ItemMenu text=" Giới thiệu Pay" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  header: {flex: 2, backgroundColor: '#4169e1'},
  touchOpacityHeader: {flex: 1, flexDirection: 'row', alignItems: 'center'},
  viewAvata: {
    width: windowWidth / 5,
    height: windowWidth / 5,
    margin: '1%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: windowWidth / 10,
  },
  viewInfo: {
    paddingLeft: '2%',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    margin: '1%',
    borderRadius: 25,
    flex: 1,
  },
  body: {flex: 11},
  viewTouchopacityBody: {
    height: '8%',
  },
  textName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'white',
  },
  touchOpacityBody: {flex: 1, justifyContent: 'center', padding: '2%'},
});
export default Wallet;
