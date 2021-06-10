import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Avatar, Card, Paragraph, Title, Button} from 'react-native-paper';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useSelector} from 'react-redux';
import InputEncloseAvatar from './InputEncloseAvatar';
import firestore from '@react-native-firebase/firestore';
const LeftContent = props => (
  <Avatar.Image
    source={{
      uri: 'https://scontent.fhan4-1.fna.fbcdn.net/v/t1.6435-1/p160x160/69198146_1346843938816773_7149406761399615488_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=7206a8&_nc_ohc=T2HIPc3q7xIAX_ZdU2e&_nc_ht=scontent.fhan4-1.fna&tp=6&oh=1d695792abaf91545e01681f2983b0f6&oe=60C319FF',
    }}
    size={50}
  />
);
const Article = ({text, image, time, uid}) => {
  const inputRef = useRef(null);
  const [like, setLike] = useState(false);
  const user = useSelector(state => state.auth.user);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    const userInfo = async () => {
      await firestore()
        .collection('user')
        .where('id', '==', uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            setId(documentSnapshot.data().id);
            setName(documentSnapshot.data().name);
            setAvatar(documentSnapshot.data().avatar);
          });
        });
    };
    userInfo();
  });
  return (
    <Card mode="outlined" style={styles.container}>
      <Card.Title
        titleStyle={{fontSize: 16, fontWeight: '500'}}
        title={name}
        subtitle={time}
        left={LeftContent}
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
  );
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
