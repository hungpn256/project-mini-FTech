import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, ImageBackground, ScrollView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import BG from '../../../assets/Img/BG.jpg';
import Logo from '../../../assets/Img/logo.png';
import Decor from '../../Components/Decor/index';
import Loading from '../../Components/Loading';
import TextInput from '../../Components/TextInput/index';
import FButton from '../../Components/TouchOpacity/index';
import {GOOGLE, LOGIN} from './constants';
import styles from './styles';
export default function Login() {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const loading = useSelector(state => state.auth.loading);
  const handleLogin = () => {
    if (email.length > 0 && pass.length > 0) {
      dispatch({
        type: LOGIN,
        payload: {email, pass},
      });
    } else {
      alert('You Email or Password is empty');
    }
  };

  const handleGoogle = () => {
    dispatch({
      type: GOOGLE,
      payload: true,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground style={styles.background} source={BG}>
          <Loading loading={loading} />
          <View style={styles.overlay}>
            <View style={styles.LogoStyle}>
              <Image source={Logo} style={styles.LogoSize} />
            </View>
            <View style={styles.quote}>
              <Text style={styles.textQuote}>
                Coin social media app. We connect people !
              </Text>
            </View>
            <View style={styles.input}>
              <TextInput
                placeholder="Email"
                onChangeText={text => setEmail(text)}
              />
              <TextInput
                placeholder="Password"
                onChangeText={text => setPass(text)}
                secure={true}
              />
            </View>
            <View style={styles.btn}>
              <FButton Name="Sign in" handlePress={handleLogin} />
            </View>
            <Decor />
            <View style={styles.btn}>
              <FButton handlePress={handleGoogle} Name="Sign in with google " />
              <Text style={[styles.textStyle, {marginBottom: 10}]}>
                Don't have an account ?{' '}
                <Text
                  onPress={() => navigate.navigate('Register')}
                  style={{fontWeight: 'bold', color: 'white'}}>
                  Sign Up
                </Text>
              </Text>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
}
