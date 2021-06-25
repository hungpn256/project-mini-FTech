import React, {useCallback, useEffect} from 'react';
import {FlatList, Pressable, RefreshControl, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Nothing from '../../Components/Nothing';
import Notification from '../../Components/Notification';
import {GET_NOTIFICATIONS, MARK_READ_ALL} from './constants';
import styles from './styles';
export default function NotificationScreen() {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notification.notifications);
  const loading = useSelector(state => state.notification.loading);
  const getNoti = useCallback(() => {
    dispatch({type: GET_NOTIFICATIONS});
  }, []);
  useEffect(() => {
    getNoti();
  }, [getNoti]);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Text
        style={{
          fontSize: 26,
          fontWeight: '700',
          padding: 10,
          borderBottomColor: 'rgba(0,0,0,0.1)',
          borderBottomWidth: 1,
        }}>
        Notifications
      </Text>
      <FlatList
        data={notifications}
        ListHeaderComponent={() => {
          return (
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.headerNoti}>News</Text>
              <Pressable
                onPress={() => {
                  dispatch({type: MARK_READ_ALL});
                }}>
                <Text style={styles.headerNoti}>Mark read</Text>
              </Pressable>
            </View>
          );
        }}
        ListEmptyComponent={() => <Nothing />}
        renderItem={({item}) => <Notification item={item} />}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getNoti} />
        }
      />
    </View>
  );
}
