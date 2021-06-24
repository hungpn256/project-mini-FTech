import React, {useRef} from 'react';
import {View} from 'react-native';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch} from 'react-redux';
import {DELETE_CONVERSION} from '../../constants';
//props gồm edit, delete, children
const SwipeCustom = ({item, children}) => {
  const swipeCustom = useRef(null);
  const dispatch = useDispatch();
  const renderRightActions = () => (
    <View
      style={{
        width: 80,
        flexDirection: 'row',
      }}>
      <View
        style={{
          flex: 1,
        }}>
        <RectButton
          style={{
            backgroundColor: '#E64A19',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
          }}
          onPress={() => {
            dispatch({type: DELETE_CONVERSION, payload: item.id});
          }}>
          <FontAwesome5 name={'trash'} size={30} color={'#fff'} />
        </RectButton>
      </View>
    </View>
  );
  return (
    <Swipeable
      ref={swipeCustom}
      friction={2}
      leftThreshold={30}
      rightThreshold={40}
      renderRightActions={renderRightActions}>
      {children}
    </Swipeable>
  );
};

export default SwipeCustom;
