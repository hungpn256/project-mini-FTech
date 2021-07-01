import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import BG from '../../../assets/Img/BG.jpg';
import Loading from '../../Components/Loading';
import Logo from '../../../assets/Img/logo.png';
import TextInput from '../../Components/TextInput/index';
import FButton from '../../Components/TouchOpacity/index';
import {REGISTER} from './constants';
import styles from './styles';
const Register = () => {
  const navigate = useNavigation();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [repass, setRepass] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const handlePress = () => {
    if (email.length > 0 && pass.length > 0 && name.length > 0) {
      if (pass === repass) {
        dispatch({
          type: REGISTER,
          payload: {email, pass, name},
        });
      } else {
        alert('Re-Password not match with password');
      }
    } else {
      alert('Your email,pass or name is empty');
    }
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
              Coin social media app. We connect people !
            </Text>
          </View>
          <View style={styles.input}>
            <TextInput
              placeholder="Full Name"
              onChangeText={text => setName(text)}
            />
            <TextInput
              placeholder="Email"
              onChangeText={text => setEmail(text)}
            />
            <TextInput
              placeholder="Password"
              onChangeText={text => setPass(text)}
              pass={true}
              secure={true}
            />
            <TextInput
              placeholder="Re-password"
              onChangeText={text => setRepass(text)}
              pass={true}
              secure={true}
            />
          </View>
          <View style={styles.btn}>
            <FButton Name="Sign up" handlePress={handlePress} />
          </View>
          <View style={styles.btn}>
            <Text style={[styles.textStyle, {marginBottom: 10}]}>
              Already have an account ?{' '}
              <Text
                onPress={() => navigate.navigate('Login')}
                style={{fontWeight: 'bold', color: '#696969'}}>
                Sign in
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;
