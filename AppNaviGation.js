import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/Screens/Auth/Login';
import Home from './src/Screens/Home';
import Register from './src/Screens/Auth/Register';
import {Provider, useSelector} from 'react-redux';
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
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
