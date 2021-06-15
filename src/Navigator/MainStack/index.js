import firestore from '@react-native-firebase/firestore';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ChatRoom from '@Screens/ChatRoom';
import Messenger from '@Screens/ChatRoom/components/Messenger';
import Home from '@Screens/Home';
import Menu from '@Screens/Menu';
import Pay from '@Screens/Pay/index';
import PayNotification from '@Screens/Pay/notification';
import Recharge from '@Screens/Pay/subScreens/recharge';
import Transfers from '@Screens/Pay/subScreens/transfers';
import WithDraw from '@Screens/Pay/subScreens/withdraw';
import Wallet from '@Screens/Pay/wallet';
import Profile from '@Screens/Profile';
import Search from '@Screens/SearchHome';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {USER_INFO, USER_SET} from '../../Screens/Auth/constants';
import NewMessenger from '../../Screens/ChatRoom/components/NewMessenger';
import {GET_CONVERSATION_SUCCESS} from '../../Screens/ChatRoom/constants';
import GameNavigator from './game';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            return (
              <View
                style={[
                  styles.tabBottom,
                  focused && styles.tabBottomFocus(color),
                ]}>
                <Ionicons name={iconName} size={size} color={color} />
              </View>
            );
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user-circle-o' : 'user-circle';
            return (
              <View
                style={[
                  styles.tabBottom,
                  focused && styles.tabBottomFocus(color),
                ]}>
                <FontAwesome name={iconName} size={size} color={color} />
              </View>
            );
          } else if (route.name === 'Notification') {
            iconName = focused ? 'bell-alt' : 'bell';
            return (
              <View
                style={[
                  styles.tabBottom,
                  focused && styles.tabBottomFocus(color),
                ]}>
                <Fontisto name={iconName} size={size} color={color} />
              </View>
            );
          } else if (route.name === 'Menu') {
            iconName = 'nav-icon-list-a';
            return (
              <View
                style={[
                  styles.tabBottom,
                  focused && styles.tabBottomFocus(color),
                ]}>
                <Fontisto name={iconName} size={size - 4} color={color} />
              </View>
            );
          }

          // You can return any component that you like here!
        },
      })}
      tabBarOptions={{
        activeTintColor: 'rgb(64,159,255)',
        inactiveTintColor: '#777',
        showLabel: false,
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Notification" component={Profile} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Menu" component={Menu} />
    </Tab.Navigator>
  );
};
const TabNavigatorPay = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            return (
              <View
                style={[
                  styles.tabBottom,
                  focused && styles.tabBottomFocus(color),
                ]}>
                <Ionicons name={iconName} size={size} color={color} />
              </View>
            );
          } else if (route.name === 'Notification') {
            iconName = focused ? 'bell-alt' : 'bell';
            return (
              <View
                style={[
                  styles.tabBottom,
                  focused && styles.tabBottomFocus(color),
                ]}>
                <Fontisto name={iconName} size={size} color={color} />
              </View>
            );
          } else if (route.name === 'Wallet') {
            iconName = 'wallet';
            return (
              <View
                style={[
                  styles.tabBottom,
                  focused && styles.tabBottomFocus(color),
                ]}>
                <Fontisto name={iconName} size={size - 4} color={color} />
              </View>
            );
          }
          // You can return any component that you like here!
        },
      })}
      tabBarOptions={{
        activeTintColor: '#3498DB',
        inactiveTintColor: '#777',
        showLabel: false,
      }}>
      <Tab.Screen name="Home" component={Pay} />
      <Tab.Screen name="Notification" component={PayNotification} />
      <Tab.Screen name="Wallet" component={Wallet} />
    </Tab.Navigator>
  );
};
export default function AppNavigator() {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const {roomChatList} = user;
  useEffect(() => {
    firestore()
      .collection('user')
      .doc(user.id)
      .onSnapshot(() => {
        dispatch({type: USER_SET});
      });
  }, []);

  useEffect(() => {
    const connectChat = async () => {
      roomChatList.forEach(item => {
        firestore()
          .collection('room-chat')
          .doc(item)
          .onSnapshot(res => {
            let data = res.data();
            let users = [];
            data.users[0].get().then(res1 => {
              users.push({id: res1.id, ...res1.data()});
            });
            data.users[1].get().then(res2 => {
              users.push({id: res2.id, ...res2.data()});
              dispatch({
                type: GET_CONVERSATION_SUCCESS,
                payload: {[item]: {...res.data(), users}},
              });
            });
          });
      });
    };
    connectChat();
  }, [roomChatList.length]);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="#"
          component={TabNavigator}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Search"
          component={Search}
        />
        <Stack.Screen name="Messenger" component={Messenger} />
        <Stack.Screen
          name="ChatRoom"
          component={ChatRoom}
          options={{
            headerRight: () => <NewMessenger />,
          }}
        />
        <Stack.Screen name="Profile-o" component={Profile} />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Pay"
          component={TabNavigatorPay}
        />
        <Stack.Screen name="Recharge" component={Recharge} />
        <Stack.Screen name="Transfers" component={Transfers} />
        <Stack.Screen name="WithDraw" component={WithDraw} />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Game"
          component={GameNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  tabBottom: {
    width: '90%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBottomFocus: color => ({
    borderColor: color,
    borderTopWidth: 4,
  }),
  headerRight: {
    marginRight: 15,
  },
});
