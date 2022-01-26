import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Loading loading={loading} />
        <View style={styles.overlay}>
          <View style={styles.LogoStyle}>
            <View
              style={{
                width: 140,
                height: 140,
                backgroundColor: '#1777F2',
                alignItems: 'center',
                borderRadius: 999,
                justifyContent: 'center',
                alignSelf: 'center',
                flex: 1,

                elevation: 5,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 80,
                  color: '#fff',
                  backgroundColor: 'transparent',
                  borderRadius: 999,
                }}>
                F
              </Text>
            </View>

            <Text
              style={{
                fontSize: 16,
                fontStyle: 'italic',
                marginTop: 10,
                letterSpacing: 1,
                color: '#1777F2',
                fontWeight: 'bold',
              }}>
              Fsocial Media DHB
            </Text>
          </View>
          <View style={styles.quote}>
            <Text style={styles.textQuote}>
              Fsocial media app. We connect people !
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
              pass={true}
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
                style={{fontWeight: 'bold', color: '#696969'}}>
                Sign Up
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
