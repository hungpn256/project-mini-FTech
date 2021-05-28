import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../../Screens/Home';
import Profile from '../../Screens/Profile';
const Tab = createBottomTabNavigator();
export default function AppNavigator() {
  return (
    <NavigationContainer>
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
            } else if (route.name === 'List') {
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
        <Tab.Screen name="List" component={Profile} />
      </Tab.Navigator>
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
