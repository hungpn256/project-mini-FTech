import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
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

const ImageCarousel = [
  {image: require('./assets/1.jpg')},
  {image: require('./assets/2.jpg')},
  {image: require('./assets/3.jpg')},
  {image: require('./assets/4.jpg')},
];

const Recharge = () => {
  return (
    <View>
      <Text>Nạp tiền</Text>
    </View>
  );
};
const Transfers = () => {
  return (
    <View>
      <Text>Chuyển tiền</Text>
    </View>
  );
};
const WithdrawMoney = () => {
  return (
    <View>
      <Text>Rút tiền</Text>
    </View>
  );
};
const Pay = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header1}>
          <Text style={styles.textHeader1}>Số dư :</Text>
          <Text style={styles.textHeader1}>10000000</Text>
        </View>
        <Divider />
        <View style={styles.header2}>
          <TouchableOpacity style={styles.touchOpacityHeader}>
            <AntDesign name="scan1" size={60} color={'white'} />
            <Text style={styles.textHeader}>Quét mã</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchOpacityHeader}>
            <MaterialCommunityIcons
              name="wallet-plus-outline"
              size={60}
              color={'white'}
            />
            <Text style={styles.textHeader}>Nạp tiền</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchOpacityHeader}>
            <FontAwesome name="exchange" size={60} color={'white'} />
            <Text style={styles.textHeader}>Chuyển tiền</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchOpacityHeader}>
            <AntDesign name="wallet" size={60} color={'white'} />
            <Text style={styles.textHeader}>Rút tiền</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <TouchableOpacity style={styles.touchOpacityBody}>
          <Ionicons name="game-controller" size={40} color={'#EC7063'} />
          <Text>Thẻ game</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchOpacityBody}>
          <FontAwesome name="mobile" size={40} color={'orange'} />
          <Text>Thẻ điện thoại</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchOpacityBody}>
          <Fontisto name="film" size={40} color={'black'} />
          <Text>Cinema</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchOpacityBody}>
          <FontAwesome name="plane" size={40} color={'#45B39D'} />
          <Text>Vé máy bay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchOpacityBody}>
          <FontAwesome5 name="money-bill" size={40} color={'#F7DC6F'} />
          <Text>Hoá đơn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchOpacityBody}>
          <FontAwesome name="coffee" size={40} color={'#7B241C'} />
          <Text>Cafe</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchOpacityBody}>
          <Ionicons name="fast-food" size={40} color={'#AF7AC5'} />
          <Text>Đồ ăn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchOpacityBody}>
          <FontAwesome name="balance-scale" size={40} color={'#839192'} />
          <Text>Tỉ giá</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchOpacityBody}>
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
};
// // const Stack = createStackNavigator();
// // const Pay = () => {
// //   return (
// //     <NavigationContainer>
// //       <Stack.Navigator initialRouteName="Home">
// //         <Stack.Screen name="Home" component={PayHomeScreen} />
// //       </Stack.Navigator>
// //     </NavigationContainer>
// //   );
// };
export default Pay;
