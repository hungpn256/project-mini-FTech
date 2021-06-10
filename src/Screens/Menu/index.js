import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Avatar, Card, Divider, List} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {LOGOUT} from '../Auth/constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {avatarDefault} from '../../index_Constant';
const heightWindow = Dimensions.get('window').height;
export default function Menu({navigation}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const handleLogout = () => {
    dispatch({
      type: LOGOUT,
    });
  };
  return (
    <ScrollView>
      <Card style={styles.container}>
        <List.Item
          onPress={() => {
            navigation.navigate('Profile');
          }}
          title={user.name}
          description="trang cá nhân"
          titleStyle={styles.name}
          left={props => (
            <Avatar.Image
              source={{uri: user.avatar || avatarDefault}}
              size={65}
            />
          )}
        />
        <Divider />
        <TouchableOpacity>
          <List.Item
            style={styles.item}
            title="Friend"
            left={props => (
              <View style={styles.iconLeft}>
                <FontAwesome name={'users'} size={25} style={{margin: 9}} />
              </View>
            )}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity>
          <List.Item
            style={styles.item}
            title="Game"
            left={props => (
              <View style={styles.iconLeft}>
                <FontAwesome name={'gamepad'} size={30} style={{margin: 6}} />
              </View>
            )}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity>
          <List.Item
            style={styles.item}
            title="Pay"
            left={props => (
              <View style={styles.iconLeft}>
                <Fontisto name="wallet" size={25} style={{margin: 9}} />
              </View>
            )}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={handleLogout}>
          <List.Item
            style={styles.item}
            title="Log out"
            left={props => (
              <View style={styles.iconLeft}>
                <List.Icon icon="logout" style={{margin: 3}} />
              </View>
            )}
          />
        </TouchableOpacity>
        <Divider />
      </Card>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    minHeight: heightWindow,
  },
  item: {
    paddingLeft: 15,
  },
  iconLeft: {
    borderWidth: 1,
    borderRadius: 999,
    borderColor: '#aaa',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
  },
});
