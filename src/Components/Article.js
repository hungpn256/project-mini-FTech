import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Avatar, Card, Paragraph, Title, Button} from 'react-native-paper';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useSelector} from 'react-redux';
import InputEncloseAvatar from './InputEncloseAvatar';
import firestore from '@react-native-firebase/firestore';
import avatarImg from '../../assets/Img/avatar.png';
import {Text} from 'react-native';
import {View} from 'react-native';
import {Pressable} from 'react-native';
const LeftContent = img => (
  <>
    {img ? (
      <Avatar.Image source={{uri: img}} size={40} />
    ) : (
      <Avatar.Image source={avatarImg} size={40} />
    )}
  </>
);

const RighContent = () => {};

const Article = ({text, image, time, uid}) => {
  const inputRef = useRef(null);
  const [like, setLike] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [status, setStatus] = useState(false);
  useEffect(() => {
    const userInfo = async () => {
      if (uid) {
        const users = await firestore()
          .collection('user')
          .where('id', '==', uid)
          .get();
        users.forEach(user => {
          setId(user.data().id);
          setName(user.data().name);
          setAvatar(user.data().avatar);
          setStatus(true);
        });
      }
    };
    userInfo();
  }, []);
  return status ? (
    <Card mode="outlined" style={styles.container}>
      <Card.Title
        titleStyle={{fontSize: 16, fontWeight: '400'}}
        title={name}
        subtitle={time}
        left={() => LeftContent(avatar)}
      />
      <Card.Content style={styles.content}>
        <Paragraph>{text}</Paragraph>
      </Card.Content>
      {image ? <Card.Cover source={{uri: image}} /> : null}
      <Card.Actions style={styles.cardAction}>
        <Pressable onPress={() => setLike(like => !like)}>
          <View style={styles.actionBtn}>
            <AntDesignIcon
              color={like ? '#4169e1' : '#696969'}
              name={!like ? 'like2' : 'like1'}
              size={20}
            />
            <Text
              style={[
                styles.actionText,
                {color: like ? '#4169e1' : '#696969'},
              ]}>
              Like
            </Text>
          </View>
        </Pressable>
        <Pressable onPress={() => inputRef.current.focus()}>
          <View style={styles.actionBtn}>
            <FontistoIcon color="#696969" name="comment" size={20} />
            <Text style={[styles.actionText, {color: '#696969'}]}>Comment</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => inputRef.current.focus()}>
          <View style={styles.actionBtn}>
            <SimpleLineIcons name="share" color="#696969" size={20} />
            <Text style={[styles.actionText, {color: '#696969'}]}>Share</Text>
          </View>
        </Pressable>
      </Card.Actions>
      <Card.Actions style={{marginBottom: 8}}>
        <InputEncloseAvatar
          inputRef={inputRef}
          editable={true}
          placeholder="Write your comment..."
        />
      </Card.Actions>
    </Card>
  ) : null;
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  //#A4A4A4
  //#4169e1
  actionText: {
    fontSize: 15,
    marginLeft: 5,
    fontWeight: '700',
  },
  content: {
    marginBottom: 8,
  },
  cardAction: {
    justifyContent: 'space-evenly',
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingVertical: 10,
    paddingHorizontal: -10,
  },
});
export default Article;
