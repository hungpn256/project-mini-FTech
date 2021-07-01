import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import CarouselComponent from './carousel';

function formatMoney(n, currency = '') {
  return currency + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

const ImageCarousel = [
  {image: require('./assets/1.jpg')},
  {image: require('./assets/2.jpg')},
  {image: require('./assets/3.jpg')},
  {image: require('./assets/4.jpg')},
];

// Pay = () => {
export default function Pay({navigation}) {
  const userMoney = useSelector(state => state.auth.user);
  console.log('user money : ', userMoney);
  const windowWidth = Dimensions.get('window').width;
  return (
    <>
      <View style={styles.header1}>
        <Pressable
          style={styles.pessableHome}
          onPress={() => {
            console.log('sda');
            navigation.navigate('#');
          }}>
          <Ionicons name="chevron-back" size={30} color="#fff" />
          <Text style={styles.textHeader1}>Home</Text>
        </Pressable>
        <Text style={styles.textHeader1}>
          Số dư : {formatMoney(userMoney.money)} đ
        </Text>
      </View>
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

      <View style={styles.body}>
        <TouchableOpacity
          style={styles.touchOpacityBody}
          onPress={() => {
            navigation.navigate('LuckyWheel');
          }}>
          <Ionicons name="game-controller" size={40} color={'#EC7063'} />
          <Text style={styles.textBody}>Quay thưởng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchOpacityBody}
          onPress={() => {
            navigation.navigate('ExchangeRate');
          }}>
          <FontAwesome name="balance-scale" size={40} color={'#839192'} />
          <Text style={styles.textBody}>Tỉ giá</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchOpacityBody}
          onPress={() => {
            Alert.alert('Chức năng đang phát triển');
          }}>
          <FontAwesome name="mobile" size={40} color={'orange'} />
          <Text style={styles.textBody}>Thẻ điện thoại</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchOpacityBody}
          onPress={() => {
            Alert.alert('Chức năng đang phát triển');
          }}>
          <Fontisto name="film" size={40} color={'black'} />
          <Text style={styles.textBody}>Cinema</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchOpacityBody}
          onPress={() => {
            Alert.alert('Chức năng đang phát triển');
          }}>
          <FontAwesome name="plane" size={40} color={'#45B39D'} />
          <Text style={styles.textBody}>Vé máy bay</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchOpacityBody}
          onPress={() => {
            Alert.alert('Chức năng đang phát triển');
          }}>
          <FontAwesome5 name="money-bill" size={40} color={'#F7DC6F'} />
          <Text style={styles.textBody}>Hoá đơn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchOpacityBody}
          onPress={() => {
            Alert.alert('Chức năng đang phát triển');
          }}>
          <FontAwesome name="coffee" size={40} color={'#7B241C'} />
          <Text style={styles.textBody}>Cafe</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchOpacityBody}
          onPress={() => {
            Alert.alert('Chức năng đang phát triển');
          }}>
          <Ionicons name="fast-food" size={40} color={'#AF7AC5'} />
          <Text style={styles.textBody}>Đồ ăn</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.touchOpacityBody}
          onPress={() => {
            Alert.alert('Chức năng đang phát triển');
          }}>
          <Feather name="shopping-cart" size={40} color={'#27AE60'} />
          <Text style={styles.textBody}>Dịch vụ khác</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <CarouselComponent
          windowWidth={windowWidth}
          style={{height: '100%', width: '100%'}}
          data={ImageCarousel}
          renderItem={({item, index}) => (
            <View
              key={index}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 15,
                overflow: 'hidden',
              }}>
              <Image
                style={{resizeMode: 'cover', flex: 1}}
                source={item.image}
              />
            </View>
          )}
        />
      </View>
    </>
  );
}
