import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../../Screens/Home';
import Menu from '../../Screens/Menu';
import Messenger from '../../Screens/Messenger';
import Profile from '../../Screens/Profile';
import ChatRoom from '../../Screens/ChatRoom';
import PayHomeScreen from '../../Screens/Pay';
import PayNotification from '../../Screens/Pay/notification';
import Wallet from '../../Screens/Pay/wallet';
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
        activeTintColor: '#3498DB',
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
      <Tab.Screen name="Home" component={PayHomeScreen} />
      <Tab.Screen name="Notification" component={PayNotification} />
      <Tab.Screen name="Wallet" component={Wallet} />
    </Tab.Navigator>
  );
};
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="#"
          component={TabNavigator}
        />
        <Stack.Screen name="Messenger" component={Messenger} />
        <Stack.Screen name="ChatRoom" component={ChatRoom} />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Pay"
          component={TabNavigatorPay}
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
});
