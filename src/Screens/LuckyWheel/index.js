import React, {Fragment} from 'react';
import {View, Text, Button} from 'react-native';
import styles from './styles';
import {line} from 'https://cdn.skypack.dev/d3-shape@3';
import {animated, useSpring} from 'react-spring';
import Svg, {Line, G, Circle, Polygon} from 'react-native-svg';

// const OFFSET = Math.random();
function LuckyWheel() {
  // const r = 200;
  // const cx = 250;
  // const cy = 250;
  // const rederItems = numOfItems => {
  //   let items = [];
  //   for (let i = 0; i < numOfItems; i++) {
  //     let xLength = Math.cos(2 * Math.PI * (i / numOfItems + OFFSET)) * (r - 5);
  //     let yLength = Math.sin(2 * Math.PI * (i / numOfItems + OFFSET)) * (r - 5);
  //     let txLength =
  //       Math.cos(2 * Math.PI * ((i + 0.5) / numOfItems + OFFSET)) * (r / 2);
  //     let tyLength =
  //       Math.sin(2 * Math.PI * ((i + 0.5) / numOfItems + OFFSET)) * (r / 2);
  //     items.push(
  //       <Fragment key={i}>
  //         <Line
  //           stroke="rgb(255,0,0)"
  //           strokeWidth="2"
  //           x1={cx + xLength}
  //           y1={cy + yLength}
  //           x2={cx}
  //           y2={cy}
  //         />
  //         <Text
  //           x={cx + txLength}
  //           y={cy + tyLength}
  //           fontSize="15px"
  //           transform={`rotate(${((i + 0.5) / numOfItems + OFFSET) * 360}
  //                 ${cx + txLength},
  //                 ${cy + tyLength})`}>
  //           {i}
  //         </Text>
  //       </Fragment>,
  //     );
  //   }
  //   return items;
  // };

  return (
    <View>
      {/* <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500 "
        style={{with: '100vw', height: '80vh'}}>
        <G fill="white" stroke="green" strokeWidth="10">
          <Circle cx="250" cy="250" r={r} />
        </G>
        <G>{rederItems(1)}</G>
        <G fill="#61DAFB">
          <Circle cx="250" cy="250" r="15" />
        </G>
        <G fill="black">
          <Circle cx="250" cy="250" r="5" />
        </G>
        <G fill="lime" stroke="purple" strokeWidth="2">
          <Polygon points="250,70 230,30 270,30" />
        </G>
      </Svg> */}
    </View>
  );
}
export default LuckyWheel;
