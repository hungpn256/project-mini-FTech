import React, { useState } from 'react'
import { View, Text, ScrollView, ImageBackground, Image,Modal,ActivityIndicator, } from 'react-native'
import BG from '../../../assets/Img/BG.jpg'
import Logo from '../../../assets/Img/logo.png'
import styles  from './styles'
import TextInput from '../../Component/TextInput/index'
import FButton from '../../Component/TouchOpacity/index'
import Decor from '../../Component/Decor/index'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import {LOGIN} from './constants'
export default function Login() {
  const navigate = useNavigation()
  const dispatch = useDispatch()
  const [email,setEmail] = useState('')
  const [pass,setPass] = useState('')
  const loading = useSelector(state => state.auth.loading)
  const handleLogin = ()=>{
    if (email.length > 0 && pass.length > 0 ) {
      dispatch({
        type:LOGIN,
        payload:{email,pass}
      })
    }
    else{
      alert("You Email or Password is empty")
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
                <TextInput placeholder="Email"  onChangeText={(text)=>setEmail(text)}/>
                <TextInput placeholder="Password"  onChangeText={(text)=>setPass(text)} secure={true}/>
              </View>
              <View style={styles.btn}>
                <FButton Name="Sign in" handlePress={handleLogin}/>
              </View>
              <Decor/>
              <View style={styles.btn}>
              <FButton Name="Sign in with google "/>
              <Text style={[styles.textStyle,{marginBottom:10}]}>Don't have an account ? <Text onPress={()=> navigate.navigate("Register")} style={{fontWeight:'bold',color:'white'}}>Sign Up</Text></Text>
              </View>
            </View>
          </ImageBackground>        
        </ScrollView>      
    </View>
  )
}
