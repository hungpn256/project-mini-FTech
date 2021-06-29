import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
const Input = ({placeholder, secure, onChangeText, pass}) => {
  const [show, setShow] = useState(secure);
  return (
    <View style={style.input}>
      <TextInput
        secureTextEntry={show && true}
        onChangeText={onChangeText}
        style={{width: '90%'}}
        placeholderTextColor="#232B2B"
        placeholder={placeholder}
      />
      {pass ? (
        <Icon
          size={20}
          onPress={() => setShow(!show)}
          color="#696969"
          name={show ? 'eye-with-line' : 'eye'}
        />
      ) : null}
    </View>
  );
};

const style = StyleSheet.create({
  input: {
    // padding:5,
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: '#e8ebf0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Input;
