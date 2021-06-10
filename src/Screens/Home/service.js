import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth, {firebase} from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const getPost = async id => {
  const post = await firestore().collection('post').doc(id).get();
  return post.data();
};

// export const getMore = async ({item}) => {
//   const data = [];
//   await firestore()
//     .collection('post')
//     .orderBy('createAt', 'desc')
//     // .startAfter(last)
//     .startAfter(item)
//     .limit(6)
//     .get()
//     .then(querySnapshot => {
//       console.log('Total users: ', querySnapshot.size);
//       querySnapshot.forEach(documentSnapshot => {
//         data.push({postId: documentSnapshot.id, ...documentSnapshot.data()});
//       });
//     });
//   return data;
// };

export const getAll = async () => {
  const data = [];
  try {
    const post = await firestore()
      .collection('post')
      .orderBy('createAt', 'desc')
      .get();
    post.forEach(documentSnapshot => {
      data.push({
        postId: documentSnapshot.id,
        ...documentSnapshot.data(),
      });
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const uploadPost = async ({text, image}) => {
  const img = await uploadImg(image);
  const likes = '';
  const id = firebase.auth().currentUser.uid;
  try {
    const data = await firestore().collection('post').add({
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
      content: text,
      imageUrl: img,
      like: likes,
      userId: id,
    });
    const postDataId = data.id;
    const post = getPost(postDataId);
    return {postId: postDataId, ...post};
  } catch (error) {
    console.log(error);
    return false;
  }
};

const uploadImg = async image => {
  if (image) {
    const fileName = image.fileName;
    const ref = storage().ref('PostImg/' + fileName);
    try {
      await ref.putFile(image.uri);
      const url = await storage()
        .ref('PostImg/' + fileName)
        .getDownloadURL();
      return url;
    } catch (error) {
      console.log(error);
    }
    console.log(image.uri);
  } else {
    return '';
  }
};
