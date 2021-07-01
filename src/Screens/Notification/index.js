import React, {useCallback, useEffect} from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Nothing from '../../Components/Nothing';
import Notification from '../../Components/Notification';
import PersonRequest from '../Friend/components/personRequest';
import {GET_FRIEND} from '../Friend/constants';
import {ACCEPT_FRIEND, REMOVE_FRIEND} from '../Profile/constants';
import {GET_NOTIFICATIONS, MARK_READ_ALL} from './constants';
import styles from './styles';
export default function NotificationScreen() {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notification.notifications);
  const loading = useSelector(state => state.notification.loading);
  const getNoti = useCallback(() => {
    dispatch({type: GET_NOTIFICATIONS});
    dispatch({type: GET_FRIEND});
  }, []);
  const user = useSelector(state => state.auth.user);
  const friend = useSelector(state => state.friend.pending);
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
  useEffect(() => {
    getNoti();
  }, [getNoti]);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Text style={styles.navigation}>Notifications</Text>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getNoti} />
        }>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.headerNoti}>News</Text>
          <Pressable
            onPress={() => {
              dispatch({type: MARK_READ_ALL});
            }}>
            <Text style={styles.headerNoti}>Mark read</Text>
          </Pressable>
        </View>
        {notifications && notifications.length > 0 ? (
          <>
            {notifications.slice(0, 3).map(item => (
              <Notification item={item} key={item.id} />
            ))}
            {friend && friend.length > 0 && (
              <>
                <View>
                  <Text style={styles.headerNoti}>Friend Requests</Text>
                </View>
                {friend.slice(0, 2).map(item => (
                  <PersonRequest
                    accept={accept}
                    item={item}
                    deleteFriend={deleteFriend}
                    key={item.id}
                  />
                ))}
              </>
            )}
            {notifications.length > 3 && (
              <>
                {friend && friend.length !== 0 && (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.headerNoti}>Early</Text>
                  </View>
                )}
                {notifications &&
                  notifications
                    .slice(3)
                    .map(item => <Notification item={item} key={item.id} />)}
              </>
            )}
          </>
        ) : (
          <Nothing />
        )}
      </ScrollView>
    </View>
  );
}
