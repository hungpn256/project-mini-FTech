import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/Screens/Auth/Login';
import Home from './src/Screens/Home';
import Register from './src/Screens/Auth/Register';
import {Provider, useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Text, View, StyleSheet} from 'react-native';
import Profile from './src/Screens/Profile';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
export default function AppNavigator() {
  const isLoged = useSelector(state => state.auth.isLoged);
  return (
    <NavigationContainer>
      {!isLoged ? (
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Register"
            component={Register}
          />
        </Stack.Navigator>
      ) : (
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
      )}
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
