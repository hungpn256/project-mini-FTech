import React from 'react';
import {Pressable, Text, TouchableOpacity} from 'react-native';
import {Styles} from './style';
const FButton = ({Name, handlePress, ...props}) => {
  return (
    <Pressable style={Styles.btn} onPress={handlePress} {...props}>
      <Text style={{color: 'white', fontSize: 18}}>{Name}</Text>
    </Pressable>
  );
};

export default FButton;
