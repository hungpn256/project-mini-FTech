import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {LOGIN} from './constants';
import styles from './styles';
const Login = ({navigation}) => {
  const refInput2 = useRef(null);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const {loading} = auth;
  const handleLogin = () => {
    if (username.length > 0 && password.length > 0) {
      dispatch({
        type: LOGIN,
        payload: {username, password},
      });
    }
  };
  return (
    <ScrollView style={styles.background}>
      <ImageBackground
        style={styles.backgroundImage}
        source={{
          uri: 'https://wallup.net/wp-content/uploads/2018/03/19/580133-portrait_display-vertical-pattern-digital_art-748x1330.jpg',
        }}>
        <Modal visible={loading} transparent={true}>
          <View style={styles.viewModal}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </Modal>
        <View style={styles.container}>
          <Text style={styles.textHeader}>Let's sign you in.</Text>
          <Text style={styles.text}>Welcome back.</Text>
          <Text style={styles.text}>You've been missed!</Text>
          <View style={styles.formInput}>
            <TextInput
              value={username}
              onChangeText={text => {
                setUserName(text);
              }}
              style={styles.input}
              placeholder="Phone, email or username"
              placeholderTextColor="#ccc"
              onEndEditing={() => {
                refInput2.current.focus();
              }}
            />
            <TextInput
              value={password}
              onChangeText={text => {
                setPassword(text);
              }}
              style={styles.input}
              ref={refInput2}
              secureTextEntry={true}
              placeholderTextColor="#ccc"
              placeholder="Password"
            />
          </View>
          <View style={styles.controller}>
            <View style={styles.textRegister}>
              <Text
                style={{
                  color: '#ccc',
                  fontSize: 16,
                }}>
                Don't have an account?
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate('Register');
                }}>
                <Text
                  style={{color: '#fff', fontSize: 16, marginHorizontal: 5}}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={handleLogin}>
              <Text style={styles.buttonSignup}> Sign in </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};
export default Login;
