import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {Avatar, Divider} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {avatarDefault} from '../../index_Constant';
const windowWidth = Dimensions.get('window').width;
const ItemMenu = props => {
  return (
    <View style={styles.viewTouchopacityBody}>
      <TouchableOpacity style={styles.touchOpacityBody}>
        <Text style={styles.textMenu}>{props.text}</Text>
      </TouchableOpacity>
      <Divider />
    </View>
  );
};
const Wallet = () => {
  const user = useSelector(state => state.auth.user);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.touchOpacityHeader}>
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
  header: {flex: 2, backgroundColor: '#1777F2'},
  touchOpacityHeader: {flex: 1, flexDirection: 'row', alignItems: 'center'},
  viewAvata: {
    width: windowWidth / 5,
    height: windowWidth / 5,
    margin: '1%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: windowWidth / 10,
    paddingLeft: 20,
  },
  viewInfo: {
    paddingLeft: 20,
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    margin: '1%',
    borderRadius: 25,
    flex: 1,
  },
  body: {flex: 11, paddingLeft: 10},
  viewTouchopacityBody: {
    height: '8%',
  },
  textName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'white',
  },
  textMenu: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  touchOpacityBody: {flex: 1, justifyContent: 'center', padding: '2%'},
});
export default Wallet;
