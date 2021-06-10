import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Divider} from 'react-native-paper';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
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
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.touchOpacityHeader}>
          <View style={styles.viewAvata}>
            <Text>Avatar</Text>
            {/* <Image
              style={styles.avata}
              source={require('./assets/naruto.png')}
            /> */}
          </View>
          <View style={styles.viewInfo}>
            <Text>Họ Và Tên</Text>
            <Text>0966666666</Text>
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
  header: {flex: 2, backgroundColor: '#5499C7'},
  touchOpacityHeader: {flex: 1, flexDirection: 'row', alignItems: 'center'},
  viewAvata: {
    width: windowWidth / 5,
    height: windowWidth / 5,
    margin: '1%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AEB6BF',
    borderRadius: windowWidth / 10,
  },
  viewInfo: {
    paddingLeft: '2%',
    flex: 1,
  },
  avatar: {},
  body: {flex: 11},
  viewTouchopacityBody: {
    height: '8%',
  },
  touchOpacityBody: {flex: 1, justifyContent: 'center', padding: '2%'},
});
export default Wallet;
