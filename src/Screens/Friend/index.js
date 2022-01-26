import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {ACCEPT_FRIEND, REMOVE_FRIEND} from '../Profile/constants';
import PersonRequest from './components/personRequest';
import {GET_FRIEND} from './constants';
import Loading from '../../Components/Loading';
import styles from './styles';
const Friend = ({navigation}) => {
  const [tab, setTab] = useState(1);
  const friend = useSelector(state => state.friend);
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
    <View style={{backgroundColor: '#fff', flex: 1}}>
      {/* <Loading loading={friend.loadFriend} /> */}
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
          color="#333"
          size={21}
          onPress={() => {
            navigation.navigate('Search');
          }}
        />
      </View>
      <View style={styles.wrapperTab}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.tabBtn}
          onPress={() => {
            setTab(1);
          }}>
          <Text style={styles.tabTxt}>Request</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.tabBtn}
          onPress={() => {
            setTab(2);
          }}>
          <Text style={styles.tabTxt}>All friend</Text>
        </TouchableOpacity>
      </View>
      {tab === 1 ? (
        <FlatList
          ListHeaderComponent={() => (
            <View>
              <Text style={styles.requestText}>Friend Requests</Text>
            </View>
          )}
          data={friend.pending}
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
      ) : (
        <FlatList
          ListHeaderComponent={() => (
            <View>
              <Text style={styles.requestText}>Friends</Text>
            </View>
          )}
          data={friend.accepted}
          renderItem={({item}) => {
            return (
              <PersonRequest
                accept={accept}
                item={item}
                deleteFriend={deleteFriend}
                isFriend={1}
              />
            );
          }}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

export default Friend;
