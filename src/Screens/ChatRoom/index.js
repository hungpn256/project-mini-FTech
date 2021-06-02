import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Avatar, Card, List} from 'react-native-paper';
import SearchBar from './components/SearchBar';
import styles from './styles';
export default function ChatRoom({navigation}) {
  const [roomList, setRoomList] = useState([]);
  const userId = auth().currentUser.uid;
  useEffect(() => {
    const x = async () => {
      const user = await firestore().collection('user').doc(userId).get();
      const roomList = await user.data().roomChatList;
      let tmp = [];
      for (let i = 0; i < roomList.length; i++) {
        const x = await roomList[i].get();
        console.log(x._data, 'x');
        tmp.push({...x._data});
        console.log(tmp, 'roomItem');
      }
      setRoomList(tmp);
    };
    x();
  }, []);
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <SearchBar />
      <View style={styles.friendWrapper}>
        <ScrollView
          horizontal={true}
          style={styles.friendWrapper}
          showsHorizontalScrollIndicator={false}>
          <Avatar.Image
            style={styles.avatar}
            source={{
              uri: 'https://scontent.fhan4-1.fna.fbcdn.net/v/t1.6435-1/p160x160/69198146_1346843938816773_7149406761399615488_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=7206a8&_nc_ohc=T2HIPc3q7xIAX_ZdU2e&_nc_ht=scontent.fhan4-1.fna&tp=6&oh=1d695792abaf91545e01681f2983b0f6&oe=60C319FF',
            }}
            size={70}
          />
          <Avatar.Image
            style={styles.avatar}
            source={{
              uri: 'https://scontent.fhan4-1.fna.fbcdn.net/v/t1.6435-1/p160x160/69198146_1346843938816773_7149406761399615488_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=7206a8&_nc_ohc=T2HIPc3q7xIAX_ZdU2e&_nc_ht=scontent.fhan4-1.fna&tp=6&oh=1d695792abaf91545e01681f2983b0f6&oe=60C319FF',
            }}
            size={70}
          />
          <Avatar.Image
            style={styles.avatar}
            source={{
              uri: 'https://scontent.fhan4-1.fna.fbcdn.net/v/t1.6435-1/p160x160/69198146_1346843938816773_7149406761399615488_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=7206a8&_nc_ohc=T2HIPc3q7xIAX_ZdU2e&_nc_ht=scontent.fhan4-1.fna&tp=6&oh=1d695792abaf91545e01681f2983b0f6&oe=60C319FF',
            }}
            size={70}
          />
          <Avatar.Image
            style={styles.avatar}
            source={{
              uri: 'https://scontent.fhan4-1.fna.fbcdn.net/v/t1.6435-1/p160x160/69198146_1346843938816773_7149406761399615488_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=7206a8&_nc_ohc=T2HIPc3q7xIAX_ZdU2e&_nc_ht=scontent.fhan4-1.fna&tp=6&oh=1d695792abaf91545e01681f2983b0f6&oe=60C319FF',
            }}
            size={70}
          />
          <Avatar.Image
            style={styles.avatar}
            source={{
              uri: 'https://scontent.fhan4-1.fna.fbcdn.net/v/t1.6435-1/p160x160/69198146_1346843938816773_7149406761399615488_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=7206a8&_nc_ohc=T2HIPc3q7xIAX_ZdU2e&_nc_ht=scontent.fhan4-1.fna&tp=6&oh=1d695792abaf91545e01681f2983b0f6&oe=60C319FF',
            }}
            size={70}
          />
          <Avatar.Image
            style={styles.avatar}
            source={{
              uri: 'https://scontent.fhan4-1.fna.fbcdn.net/v/t1.6435-1/p160x160/69198146_1346843938816773_7149406761399615488_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=7206a8&_nc_ohc=T2HIPc3q7xIAX_ZdU2e&_nc_ht=scontent.fhan4-1.fna&tp=6&oh=1d695792abaf91545e01681f2983b0f6&oe=60C319FF',
            }}
            size={70}
          />
        </ScrollView>
      </View>
      <View>
        {roomList &&
          roomList.map((i, index) => {
            const userOther = i.users.find(i => i.id !== userId);
            const {messages} = i;
            console.log(userOther);
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate('Messenger');
                }}>
                <Card style={styles.card}>
                  <List.Item
                    style={styles.item}
                    title={
                      <View style={styles.wrapperTitle}>
                        <Text style={styles.name}>{userOther.name}</Text>
                        <Text style={styles.time}>
                          {moment(i.updatedAt).fromNow()}
                        </Text>
                      </View>
                    }
                    description={messages[messages.length - 1].text}
                    titleStyle={styles.titleStyle}
                    left={() => (
                      <Avatar.Image
                        source={{
                          uri: userOther.avatar,
                        }}
                        size={55}
                      />
                    )}
                  />
                </Card>
              </TouchableOpacity>
            );
          })}
      </View>
    </ScrollView>
  );
}
