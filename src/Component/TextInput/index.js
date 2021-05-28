import React, { useState } from 'react'
import { View, Text, TextInput,StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
const Input = ({placeholder,secure,onChangeText}) => {

    return (
        <View style={style.input}>
        <TextInput secureTextEntry={secure && true} onChangeText={onChangeText}  style={{width:'90%'}} placeholderTextColor='#232B2B' placeholder={placeholder}/>
        </View>
    )
}

const style = StyleSheet.create({
    input:{
        // padding:5,
        paddingHorizontal:10,
        marginTop:10,
        borderRadius:8,
        backgroundColor:'#e8ebf0',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    }
})

export default Input