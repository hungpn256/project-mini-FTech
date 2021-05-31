import React from 'react';
import {Text, View} from 'react-native';
import {Avatar} from 'react-native-paper';
import {List} from 'react-native-paper';

export default function ChatRoom() {
  return (
    <View>
      <List.Item
        title={
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#abc',
            }}>
            <Text>Pham Nang Hung</Text>
            <Text>12h ago</Text>
          </View>
        }
        titleStyle={{}}
        left={() => (
          <Avatar.Image
            source={{
              uri: 'https://scontent.fhan4-1.fna.fbcdn.net/v/t1.6435-1/p160x160/69198146_1346843938816773_7149406761399615488_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=7206a8&_nc_ohc=T2HIPc3q7xIAX_ZdU2e&_nc_ht=scontent.fhan4-1.fna&tp=6&oh=1d695792abaf91545e01681f2983b0f6&oe=60C319FF',
            }}
            size={45}
          />
        )}
      />
    </View>
  );
}
