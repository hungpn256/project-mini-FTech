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
const LeftContent = img => (
  <>
    {img ? (
      <Avatar.Image source={{uri: img}} size={40} />
    ) : (
      <Avatar.Image source={avatarImg} size={40} />
    )}
  </>
);
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
        await firestore()
          .collection('user')
          .where('id', '==', uid)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
              setId(documentSnapshot.data().id);
              setName(documentSnapshot.data().name);
              setAvatar(documentSnapshot.data().avatar);
              setStatus(true);
            });
          });
      }
    };
    userInfo();
  });
  return status ? (
    <Card mode="outlined" style={styles.container}>
      <Card.Title
        titleStyle={{fontSize: 16, fontWeight: '500'}}
        title={name}
        subtitle={time}
        left={() => LeftContent(avatar)}
      />
      <Card.Content style={styles.content}>
        <Paragraph>{text}</Paragraph>
      </Card.Content>
      {image ? <Card.Cover source={{uri: image}} /> : null}
      <Card.Actions style={styles.cardAction}>
        <Button
          onPress={() => {
            setLike(like => !like);
          }}>
          <AntDesignIcon name={!like ? 'like2' : 'like1'} size={28} />
        </Button>
        <Button
          onPress={() => {
            inputRef.current.focus();
          }}>
          <FontistoIcon name="comment" size={24} />
        </Button>
        <Button>
          <SimpleLineIcons name="share" size={24} />
        </Button>
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
  content: {
    marginBottom: 8,
  },
  cardAction: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 0,
    marginVertical: 4,
  },
});
export default Article;
