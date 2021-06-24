import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
<<<<<<< HEAD
  Alert,
=======
  Pressable,
>>>>>>> 38f489d66aad9839e3c3a580f7a790d01e95c93a
} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {Divider} from 'react-native-paper';
import {useSelector} from 'react-redux';

const ImageCarousel = [
  {image: require('./assets/1.jpg')},
  {image: require('./assets/2.jpg')},
  {image: require('./assets/3.jpg')},
  {image: require('./assets/4.jpg')},
];

// Pay = () => {
export default function Pay({navigation}) {
  const userMoney = useSelector(state => state.auth.user);
  console.log('====================================');
  console.log(userMoney);
  console.log('====================================');
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header1}>
          <Pressable
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => {
              console.log('sda');
              navigation.navigate('#');
            }}>
            <Ionicons name="chevron-back" color="#fff" size={40} />
            <Text style={styles.textHeader1}>Home</Text>
          </Pressable>
          <Text style={styles.textHeader1}>Số dư : {userMoney.money} đ</Text>
        </View>
        <Divider />
        <View style={styles.header2}>
          <TouchableOpacity style={styles.touchOpacityHeader}>
            <AntDesign name="scan1" size={50} color={'white'} />
            <Text style={styles.textHeader}>Quét mã</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchOpacityHeader}
            onPress={() => {
              navigation.navigate('Recharge');
            }}>
            <MaterialCommunityIcons
              name="wallet-plus-outline"
              size={50}
              color={'white'}
            />
            <Text style={styles.textHeader}>Nạp tiền</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchOpacityHeader}
            onPress={() => {
              navigation.navigate('Transfers');
            }}>
            <FontAwesome name="exchange" size={50} color={'white'} />
            <Text style={styles.textHeader}>Chuyển tiền</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchOpacityHeader}
            onPress={() => {
              navigation.navigate('WithDraw');
            }}>
            <AntDesign name="wallet" size={50} color={'white'} />
            <Text style={styles.textHeader}>Rút tiền</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView></ScrollView>
      <View style={styles.body}>
        <TouchableOpacity
          style={styles.touchOpacityBody}
          onPress={() => {
            Alert.alert('Chức năng đang phát triển');
          }}>
          <Ionicons name="game-controller" size={40} color={'#EC7063'} />
          <Text>Thẻ game</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchOpacityBody}
          onPress={() => {
            Alert.alert('Chức năng đang phát triển');
          }}>
          <FontAwesome name="mobile" size={40} color={'orange'} />
          <Text>Thẻ điện thoại</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchOpacityBody}
          onPress={() => {
            Alert.alert('Chức năng đang phát triển');
          }}>
          <Fontisto name="film" size={40} color={'black'} />
          <Text>Cinema</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchOpacityBody}
          onPress={() => {
            Alert.alert('Chức năng đang phát triển');
          }}>
          <FontAwesome name="plane" size={40} color={'#45B39D'} />
          <Text>Vé máy bay</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchOpacityBody}
          onPress={() => {
            Alert.alert('Chức năng đang phát triển');
          }}>
          <FontAwesome5 name="money-bill" size={40} color={'#F7DC6F'} />
          <Text>Hoá đơn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchOpacityBody}
          onPress={() => {
            Alert.alert('Chức năng đang phát triển');
          }}>
          <FontAwesome name="coffee" size={40} color={'#7B241C'} />
          <Text>Cafe</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchOpacityBody}
          onPress={() => {
            Alert.alert('Chức năng đang phát triển');
          }}>
          <Ionicons name="fast-food" size={40} color={'#AF7AC5'} />
          <Text>Đồ ăn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchOpacityBody}
          onPress={() => {
            Alert.alert('Chức năng đang phát triển');
          }}>
          <FontAwesome name="balance-scale" size={40} color={'#839192'} />
          <Text>Tỉ giá</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchOpacityBody}
          onPress={() => {
            Alert.alert('Chức năng đang phát triển');
          }}>
          <Feather name="shopping-cart" size={40} color={'#27AE60'} />
          <Text>Dịch vụ khác</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <SwiperFlatList
          autoplay
          autoplayDelay={3}
          autoplayLoop
          index={0}
          showPagination
          data={ImageCarousel}
          renderItem={({item}) => (
            <View style={[styles.child, {backgroundColor: item}]}>
              <Image style={styles.imageCarousel} source={item.image} />
            </View>
          )}
        />
      </View>
    </View>
  );
}
// export default Pay;
