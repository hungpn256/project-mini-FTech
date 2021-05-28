import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../../Screens/Auth/Login'
import Register from '../../Screens/Auth/Register'
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();
export default function index() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
            headerShown:false
        }}>
          <Stack.Screen
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name="Register"
            component={Register}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
}
