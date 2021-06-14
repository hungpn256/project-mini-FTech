import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
export default function HighScore() {
  // const highScore = useSelector(state => state.minesweeper.score);
  return (
    <View>
      <Text
        style={{
          fontSize: 25,
          fontWeight: '700',
          textAlign: 'center',
          margin: 30,
        }}>
        HIGH SCORE
      </Text>
      <View style={styles.highScore}>
        {/* {highScore.map((item, index) => {
          return (
            <View style={styles.scoreRow} key={index}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.score}>
                {('0' + Math.floor(item.score / 60)).slice(-2) +
                  ' : ' +
                  ('0' + (item.score % 60)).slice(-2)}
              </Text>
            </View>
          );
        })} */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  highScore: {
    paddingHorizontal: 40,
  },
  scoreRow: {
    flexDirection: 'row',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 3,
    borderRadius: 5,
  },
  name: {
    fontSize: 20,
    width: 200,
    height: '100%',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  score: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    textAlign: 'center',
    borderLeftColor: '#ccc',
    borderLeftWidth: 3,
    paddingLeft: 10,
  },
});
