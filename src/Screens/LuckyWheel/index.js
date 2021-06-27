import React, {useState} from 'react'
import { View, Text, Button } from 'react-native'
import styles from './styles'
import WheelOfFortune from 'react-native-wheel-of-fortune'

const LuckyWheel = () =>{
    // const participants = [
    //     '%10',
    //     '%20',
    //     '%30',
    //     '%40',
    //     '%50',
    //     '%60',
    //     '%70',
    //     '%90',
    //     'FREE',
    //   ];
    //   const wheelOptions = {
    //     rewards: participants,
    //     knobSize: 50,
    //     borderWidth: 5,
    //     borderColor: '#000',
    //     innerRadius: 50,
    //     duration: 4000,
    //     backgroundColor: 'transparent',
    //     textAngle: 'horizontal',
    //     knobSource: require('./assets/images/knoob.png'),
    //     getWinner: (value, index) => {
    //       this.setState({winnerValue: value, winnerIndex: index});
    //     },
    //     onRef: ref => (this.child = ref),
    //   };
    return (
        <View>
            <Text>aloooôoo</Text>
            {/* <WheelOfFortune
                options={wheelOptions}
            />
            <Button title="Press me" onPress={ () => { this.child._onPress() } } /> */}
        </View>
    );
};
 export default LuckyWheel;
