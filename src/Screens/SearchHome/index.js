import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, ScrollView} from 'react-native';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {Avatar} from 'react-native-paper';
import Info from './userInfo';
import {log} from 'react-native-reanimated';
import {USERINFO_SEARCH} from './constants';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
export default function index() {
  const [value, setValue] = useState('');
  const navigation = useNavigation();
  const users = useSelector(state => state.search.users);
  const dispatch = useDispatch();
  useEffect(() => {
    if (value.length > 0) {
      dispatch({type: USERINFO_SEARCH, payload: {userSearch: value}});
    } else if (value.length == 0) {
      console.log(2);
      dispatch({type: USERINFO_SEARCH, payload: {userSearch: []}});
    }
  }, [value]);

  return (
    <View style={styles.container}>
      <View style={styles.searchGroup}>
        <Icon
          name="chevron-back"
          size={30}
          onPress={() => {
            navigation.navigate('#');
          }}
        />
        <TextInput
          placeholder="Search User"
          onChangeText={e => setValue(e)}
          style={styles.input}
        />
      </View>
      <View style={styles.results}>
        <Text style={styles.text}>Search Result</Text>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsHorizontalScrollIndicator={false}>
          {users
            ? users.length > 0 &&
              users.map(user => {
                return (
                  <Info
                    key={user.id}
                    name={user.name}
                    id={user.id}
                    avatar={user.avatar}
                  />
                );
              })
            : null}
        </ScrollView>
      </View>
    </View>
  );
}
