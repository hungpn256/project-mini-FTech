import React, {useRef, useState} from 'react';
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
import {AUTH_CHANGE_STATE, REGISTER} from './constants';
import styles from './styles';
const Register = ({navigation}) => {
  const refInput2 = useRef(null);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const {loading, registerSuccess} = auth;
  const handleRegister = () => {
    if (username.length > 0 && password.length > 0) {
      dispatch({
        type: REGISTER,
        payload: {username, password},
      });
    }
  };
  if (registerSuccess) {
    dispatch({
      type: AUTH_CHANGE_STATE,
      payload: {registerSuccess: false},
    });
    navigation.navigate('Login');
  }
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
                Have an account?
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate('Login');
                }}>
                <Text
                  style={{color: '#fff', fontSize: 16, marginHorizontal: 5}}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={handleRegister}>
              <Text style={styles.buttonSignup}> Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default Register;
