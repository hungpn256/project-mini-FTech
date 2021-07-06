import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ChatRoom from '@Screens/ChatRoom';
import Messenger from '@Screens/ChatRoom/components/Messenger';
import Home from '@Screens/Home';
import LuckyWheel from '@Screens/LuckyWheel/index';
import Menu from '@Screens/Menu';
import Pay from '@Screens/Pay/index';
import PayNotification from '@Screens/Pay/notification';
import ExchangeRate from '@Screens/Pay/subScreens/exchangerate';
import Recharge from '@Screens/Pay/subScreens/recharge';
import Transfers from '@Screens/Pay/subScreens/transfers';
import WithDraw from '@Screens/Pay/subScreens/withdraw';
import Wallet from '@Screens/Pay/wallet';
import PostDetail from '@Screens/PostDetail';
import Profile from '@Screens/Profile';
import EditProfile from '@Screens/Profile/components/FormEdit';
import Search from '@Screens/SearchHome';
import React, {useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {GET_USER_SUCCESS} from '../../Screens/Auth/constants';
import NewMessenger from '../../Screens/ChatRoom/components/NewMessenger';
import {
  GET_CONVERSATION_SUCCESS,
  GET_USER_BY_NAME,
} from '../../Screens/ChatRoom/constants';
import Friend from '../../Screens/Friend';
import {GET_FRIEND} from '../../Screens/Friend/constants';
import Notification from '../../Screens/Notification';
import {
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_SUCCESS,
} from '../../Screens/Notification/constants';
import {notiMes} from '../../Screens/Notification/service';
import GameNavigator from './game';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const StackNavigatorProfile = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="ProfileMain"
        component={Profile}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Friends"
        component={Friend}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="EditProfile"
        component={EditProfile}
      />
    </Stack.Navigator>
  );
};
const StackNavigatorMenu = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="EditProfile"
        component={Menu}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Friends"
        component={Friend}
      />
    </Stack.Navigator>
  );
};
const TabNavigator = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    notiMes();
    dispatch({type: GET_NOTIFICATIONS});
  }, []);
  const notifications = useSelector(state => state.notification.notifications);
  console.log(notifications, 'noti number');
  const numberNoti = useMemo(() => {
    return notifications.filter(i => i.unread).length;
  }, [notifications]);
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
        },
      })}
      tabBarOptions={{
        activeTintColor: '#1777F2',
        inactiveTintColor: '#676356',
        showLabel: false,
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={
          numberNoti
            ? {
                tabBarBadge: numberNoti,
              }
            : {}
        }
      />
      <Tab.Screen name="Profile" component={StackNavigatorProfile} />
      <Tab.Screen name="Menu" component={StackNavigatorMenu} />
    </Tab.Navigator>
  );
};
const TabNavigatorPay = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home-Pay') {
            iconName = focused ? 'home' : 'home-outline';
            return (
              <View
                style={[
                  styles.tabBottom,
                  // focused && styles.tabBottomFocus(color),
                ]}>
                <Ionicons name={iconName} size={size} color={color} />
              </View>
            );
          } else if (route.name === 'Notification-Pay') {
            iconName = focused ? 'bell-alt' : 'bell';
            return (
              <View
                style={[
                  styles.tabBottom,
                  // focused && styles.tabBottomFocus(color),
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
                  // focused && styles.tabBottomFocus(color),
                ]}>
                <Fontisto name={iconName} size={size - 4} color={color} />
              </View>
            );
          }
          // You can return any component that you like here!
        },
      })}
      tabBarOptions={{
        activeTintColor: '#1777F2',
        inactiveTintColor: '#676356',
        showLabel: false,
      }}>
      <Tab.Screen name="Home-Pay" component={Pay} />
      <Tab.Screen name="Notification-Pay" component={PayNotification} />
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
      .onSnapshot(res => {
        dispatch({
          type: GET_USER_SUCCESS,
          payload: {user: res.data()},
        });
      });
    dispatch({type: GET_FRIEND});
    dispatch({
      type: GET_USER_BY_NAME,
      payload: '',
    });
    firestore()
      .collection('notification')
      .where('received', '==', auth().currentUser.uid)
      .orderBy('updateAt', 'desc')
      .onSnapshot(async noti => {
        let res = [];
        for (let i = 0; i < noti.size; i++) {
          let users = [];
          const data = noti.docs[i].data();
          const usersFirebase = data.userId.slice(-2);
          for (let j = usersFirebase.length - 1; j >= 0; j--) {
            const user = await firestore()
              .collection('user')
              .doc(usersFirebase[j])
              .get();
            users.push(user.data());
          }
          const post = await firestore()
            .collection('post')
            .doc(data.postId)
            .get();
          res.push({id: noti.docs[i].id, ...data, users, post: post.data()});
        }
        dispatch({type: GET_NOTIFICATIONS_SUCCESS, payload: res});
      });
  }, []);

  useEffect(() => {
    console.log(roomChatList);
    const connectChat = async () => {
      roomChatList &&
        roomChatList.forEach(item => {
          firestore()
            .collection('room-chat')
            .doc(item)
            .onSnapshot(res => {
              console.log(item, 'sss', res);
              let data = res.data();
              if (data && data.messages?.length > 0) {
                let users = [];
                Promise.all([data.users[0].get(), data.users[1].get()]).then(
                  ([res1, res2]) => {
                    users.push({id: res1.id, ...res1.data()});
                    users.push({id: res2.id, ...res2.data()});
                    console.log({[item]: {...res.data(), users}}, 'mess');
                    dispatch({
                      type: GET_CONVERSATION_SUCCESS,
                      payload: {[item]: {...res.data(), users}},
                    });
                  },
                );
              }
            });
        });
    };
    connectChat();
  }, [roomChatList?.length]);
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
        <Stack.Screen
          name="Messenger"
          component={Messenger}
          options={({route}) => ({title: route.params.name})}
        />
        <Stack.Screen
          name="ChatRoom"
          component={ChatRoom}
          options={{
            headerRight: () => <NewMessenger />,
            title: 'FMessenger',
          }}
        />
        <Stack.Screen
          options={({route}) => ({title: route.params.name})}
          name="Profile-o"
          component={Profile}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Pay"
          component={Pay}
        />
        <Stack.Screen name="Recharge" component={Recharge} />
        <Stack.Screen name="Transfers" component={Transfers} />
        <Stack.Screen name="WithDraw" component={WithDraw} />
        <Stack.Screen name="LuckyWheel" component={LuckyWheel} />
        <Stack.Screen name="ExchangeRate" component={ExchangeRate} />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Game"
          component={GameNavigator}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="PostDetail"
          component={PostDetail}
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
