import React from 'react'
import { Text,TouchableOpacity } from 'react-native'
import {Styles} from './style'
const FButton =({Name,handlePress})=> {
    return (
        <TouchableOpacity style={Styles.btn} onPress={handlePress}>
            <Text style={{color:'white',fontSize:18}}>{Name}</Text>
        </TouchableOpacity>
    )
}

export default FButton