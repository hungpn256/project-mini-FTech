import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';
import GameStart from '@Screens/Game/Minesweeper/GameStart';
import HighScore from '@Screens/Game/Minesweeper/HighScore';
import MainGame from '@Screens/Game/Minesweeper/Main';
import MenuGame from '@Screens/Game/MenuGame';
export const DimensionContext = React.createContext();
const GameNavigator = () => {
  const [dimension, setDimension] = useState(9);
  const [positionRecentlyClick, setPositionRecentlyClick] = useState({
    x: 0,
    y: 0,
  });
  const Stack = createStackNavigator();

  return (
    <DimensionContext.Provider
      value={{
        dimension,
        setDimension,
        positionRecentlyClick,
        setPositionRecentlyClick,
      }}>
      <Stack.Navigator>
        <Stack.Screen name="MenuGame" component={MenuGame} />
        <Stack.Screen name="HighScore" component={HighScore} />
        <Stack.Screen name="StartGame" component={GameStart} />
        <Stack.Screen name="Game" component={MainGame} />
      </Stack.Navigator>
    </DimensionContext.Provider>
  );
};

export default GameNavigator;
