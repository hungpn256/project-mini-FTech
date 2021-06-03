import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar, List} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import {commonRoom} from '../../../Helper/function';
import {GET_USER_BY_NAME} from '../constants';
import SearchBar from './SearchBar';
const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const NewMessenger = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.auth.user);
  const [visibleModal, setVisibleModal] = useState(false);
  const userSearch = useSelector(state => state.chat.userSearch);
  const dispatch = useDispatch();
  const [txtSearch, setTxtSearch] = useState('');
  useEffect(() => {
    if (visibleModal) {
      dispatch({
        type: GET_USER_BY_NAME,
        payload: txtSearch,
      });
    }
  }, [txtSearch, visibleModal]);
  return (
    <View>
      <TouchableOpacity
        style={styles.headerRight}
        onPress={() => {
          setVisibleModal(true);
        }}>
        <Entypo name="new-message" size={30} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        visible={visibleModal}
        transparent={true}
        onRequestClose={() => {
          setVisibleModal(false);
        }}>
        <View style={styles.background}>
          <View style={styles.container}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{flex: 1}}>
                <SearchBar txtSearch={txtSearch} setTxtSearch={setTxtSearch} />
              </View>
              <TouchableOpacity onPress={() => setVisibleModal(false)}>
                <AntDesign
                  name="closecircle"
                  size={30}
                  color="#777"
                  style={{marginRight: 15, marginTop: 4}}
                />
              </TouchableOpacity>
            </View>
            <List.Section style={styles.result}>
              <List.Subheader>Result:</List.Subheader>
              <FlatList
                data={userSearch}
                renderItem={({item}) => (
                  <List.Item
                    style={styles.user}
                    title={item.name}
                    titleStyle={styles.name}
                    onPress={() => {
                      setVisibleModal(false);
                      const room = commonRoom(item, user);
                      navigation.navigate('Messenger', {
                        user: item,
                        roomId: room[0],
                      });
                    }}
                    left={() => (
                      <Avatar.Image
                        style={styles.avatar}
                        source={{
                          uri:
                            item.avatarUrl ||
                            'https://lh3.googleusercontent.com/proxy/viY8Ajx1sbO5igZvqESVX7HE-zMHjgqlAAXvdflujTiZSs-YCdqci3sawNkZCboLRWHwSt6h76r6E8a2ERgJJLHX_KFh9wwEU6aTWKYkaA',
                        }}
                        size={60}
                      />
                    )}
                  />
                )}
                keyExtractor={item => item.id}
              />
            </List.Section>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  headerRight: {
    marginRight: 15,
  },
  avatarImg: {
    width: 50,
    height: 50,
  },
  result: {
    marginTop: 20,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 5,
  },
});
export default NewMessenger;
