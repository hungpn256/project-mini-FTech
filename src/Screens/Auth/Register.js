import React, { useState } from 'react'
import { View, Text, ScrollView, ImageBackground, Image,Modal,ActivityIndicator } from 'react-native'
import BG from '../../../assets/Img/BG.jpg'
import Logo from '../../../assets/Img/logo.png'
import styles  from './styles'
import TextInput from '../../Component/TextInput/index'
import FButton from '../../Component/TouchOpacity/index'
import Decor from '../../Component/Decor/index'
import { useNavigation } from '@react-navigation/native';
import { useDispatch,useSelector } from 'react-redux'
import {REGISTER} from './constants'
const Register = () => {
  const navigate = useNavigation()
  const [email,setEmail] = useState('')
  const [pass,setPass] = useState('')
  const [name,setName] = useState('')
  const [repass,setRepass] = useState('')
  const dispatch = useDispatch()
  const loading = useSelector(state => state.auth.loading)
  const handlePress = () =>{
    if (email.length > 0 && pass.length > 0 && name.length > 0 ) {
      if (pass === repass) {
        dispatch({
          type: REGISTER,
          payload:{email,pass,name}
        })
      }
      else{
        alert("Re-Password not match with password")
      }      
    }
    else{
      alert("Your email,pass or name is empty")
    }
  }

  return (
    <View style={styles.container}>
        <ScrollView >
          <ImageBackground style={styles.background} source={BG}>
          <Modal visible={loading} transparent={true}>
              <View style={styles.viewModal}>
                <ActivityIndicator size="large" color="#232B2B" />
              </View>
          </Modal>    
            <View style={styles.overlay}>
              <View style={styles.LogoStyle}>
                <Image source={Logo} style={styles.LogoSize}/>
              </View>
              <View style={styles.quote}>
                <Text style={styles.textQuote}>Coin social media app. We connect people !</Text>
              </View>
              <View style={styles.input}>
                <TextInput placeholder="Full Name"  onChangeText={(text)=>setName(text)}/>
                <TextInput placeholder="Email"  onChangeText={(text)=>setEmail(text)}/>
                <TextInput placeholder="Password"  onChangeText={(text)=>setPass(text)} secure={true}/>
                <TextInput placeholder="Re-password"  onChangeText={(text)=>setRepass(text)} secure={true}/>
              </View>
              <View style={styles.btn}>
                <FButton Name="Sign up" handlePress={handlePress}/>
              </View>
              <View style={styles.btn}>
              <Text style={[styles.textStyle,{marginBottom:10}]}>Already have an account ? <Text onPress={()=> navigate.navigate("Login")} style={{fontWeight:'bold',color:'white'}}>Sign in</Text></Text>
              </View>
            </View>
          </ImageBackground>        
        </ScrollView>      
    </View>
  )
};

export default Register;
