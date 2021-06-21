import React, {useCallback, useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {ACCEPT_FRIEND, REMOVE_FRIEND} from '../Profile/constants';
import PersonRequest from './components/personRequest';
import {GET_FRIEND} from './constants';
import styles from './styles';
const Friend = ({navigation}) => {
  const friend = useSelector(state => state.friend.pending);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type: GET_FRIEND});
  }, []);
  const accept = useCallback(
    item => {
      dispatch({
        type: ACCEPT_FRIEND,
        payload: {
          id: item.id,
          friendIdPartner: item.friend.id,
          friendId: user.friend.id,
        },
      });
    },
    [user.id],
  );
  const deleteFriend = useCallback(
    item => {
      dispatch({
        type: REMOVE_FRIEND,
        payload: {
          id: item.id,
          friendIdPartner: item.friend.id,
          friendId: user.friend.id,
        },
      });
    },
    [user.id],
  );
  return (
    <View style={{backgroundColor: '#fff'}}>
      <FlatList
        ListHeaderComponent={() => (
          <>
            <View style={styles.header}>
              <Text style={styles.textHeader}>Friends</Text>
              <Ionicons
                style={[styles.icon, {left: 10, top: 7}]}
                name="chevron-back"
                size={25}
                onPress={() => {
                  console.log('abc');
                  navigation.goBack();
                }}
              />
              <Fontisto
                style={[styles.icon, {right: 10}]}
                name="search"
                color="#123"
                size={21}
                onPress={() => {
                  navigation.navigate('Search');
                }}
              />
            </View>
            <View>
              <Text style={styles.requestText}>Request friends:</Text>
            </View>
          </>
        )}
        data={friend}
        renderItem={({item}) => {
          return (
            <PersonRequest
              accept={accept}
              item={item}
              deleteFriend={deleteFriend}
            />
          );
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Friend;
