import {Picker} from '@react-native-picker/picker';
import React, {useContext} from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import {DimensionContext} from '*/Navigator/MainStack/game';
const GameStart = ({navigation}) => {
  const {dimension, setDimension} = useContext(DimensionContext);
  return (
    <View style={styles.background}>
      <View>
        <Text style={styles.title}>Select dimension:</Text>
        <Picker
          selectedValue={dimension}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => {
            setDimension(itemValue);
          }}>
          <Picker.Item label="5x5" value={5} />
          <Picker.Item label="9x9" value={9} />
          <Picker.Item label="16x16" value={16} />
        </Picker>
        <Pressable
          style={styles.btnStartGame}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('Game');
          }}>
          <Text style={styles.btnText}>Start Game</Text>
        </Pressable>
        <Pressable
          style={styles.btnStartGame}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('HighScore');
          }}>
          <Text style={styles.btnText}>High score</Text>
        </Pressable>
      </View>
    </View>
  );
};
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  background: {
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: 150,
    borderColor: '#ccc',
    borderWidth: 2,
  },
  title: {
    minWidth: 150,
    fontSize: 20,
    color: '#633121',
  },
  btnStartGame: {
    backgroundColor: 'pink',
    minWidth: 150,
    borderRadius: 10,
    marginTop: 20,
  },
  btnText: {
    color: '#fff',
    padding: 10,
    textAlign: 'center',
  },
});
export default GameStart;
