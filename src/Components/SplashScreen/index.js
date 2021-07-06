import React, {useEffect, useRef} from 'react';
import {Animated, Text, View, Dimensions} from 'react-native';
import {Styles} from './style';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function Loading() {
  const animated = useRef(new Animated.Value(0)).current;
  const animatedText = useRef(new Animated.Value(-width)).current;
  useEffect(() => {
    Animated.spring(animated, {
      toValue: 1,
      friction: 2,
      tension: 1,
      velocity: 1,
    }).start();
    Animated.spring(animatedText, {
      toValue: 0,
      speed: 1,
      bounciness: 5,
      velocity: 1,
    }).start();
  }, []);
  return (
    <View style={Styles.container}>
      <Animated.View
        style={[
          {
            width: 140,
            height: 140,
            backgroundColor: '#1777F2',
            alignItems: 'center',
            borderRadius: 999,
            justifyContent: 'center',
            alignSelf: 'center',
            elevation: 5,
          },
          {transform: [{scale: animated}]},
        ]}>
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
      </Animated.View>

      <Animated.Text
        style={[
          {
            fontSize: 16,
            marginTop: 16,
            fontStyle: 'italic',
            color: '#1777F2',
            fontWeight: 'bold',
          },
          {
            transform: [{translateX: animatedText}],
          },
        ]}>
        Fsocial Media DHB
      </Animated.Text>
    </View>
  );
}
