import LuckyWheelImg from '*/Assets/luckywheel.png';
import moment from 'moment';
import React, {useRef, useState} from 'react';
import {Animated, Easing, Image, View, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import Arrow from '*/Assets/arrow.jpg';
import {useDispatch} from 'react-redux';
import {RECHARGE_MONEY} from '../Pay/constaints';
const LuckyWheel = () => {
  const ani = useRef(new Animated.Value(0)).current;
  const [toValue, setToValue] = useState(1);
  const [spining, setSpining] = useState(false);
  const spin = ani.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', (toValue * 360).toString() + 'deg'],
  });
  const dispatch = useDispatch();
  const start = () => {
    ani.setValue(0);
    setSpining(true);
    const rotate = Math.random() * (20 - 19) + 19;
    console.log(rotate);
    setToValue(rotate);
    Animated.timing(ani, {
      duration: 5000,
      toValue: 1,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        setSpining(false);
        const tmp = (rotate - Math.floor(rotate)) * 1000;
        console.log(tmp);
        let prize;
        if (tmp < 125) {
          prize = 20000;
        } else if (tmp < 250) {
          prize = 10000;
        } else if (tmp < 375) {
          prize = 5000;
        } else if (tmp < 500) {
          prize = 2000;
        } else if (tmp < 625) {
          prize = 1000;
        } else if (tmp < 750) {
          prize = 0;
        } else if (tmp < 875) {
          prize = 100000;
        } else {
          prize = 50000;
        }
        if (prize !== 0) {
          Alert.alert(`you win ${prize}vnd!!!! `);
          dispatch({type: RECHARGE_MONEY, payload: prize});
        } else {
          Alert.alert(`Wish you luck next time`);
        }
      }, 500);
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
      }}>
      <View>
        <Animated.View style={{transform: [{rotateZ: spin}]}}>
          <Image source={LuckyWheelImg} style={{width: 300, height: 300}} />
        </Animated.View>
        <Button
          mode="contained"
          onPress={start}
          disabled={spining}
          style={{marginTop: 20}}>
          Spin
        </Button>
        <Image
          source={Arrow}
          style={{
            position: 'absolute',
            height: 50,
            width: 50,
            alignSelf: 'center',
            top: 108,
            resizeMode: 'contain',
          }}
        />
      </View>
    </View>
  );
};
export default LuckyWheel;
