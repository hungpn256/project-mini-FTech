import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth, {firebase} from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {uploadImg} from '../../Helper/function';
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
const getCmt = async id => {
  const cmt = await firestore().collection('comments').doc(id).get();
  return cmt.data();
};

export const dataUser = async () => {
  const user = await firestore()
    .collection('user')
    .doc(auth().currentUser.uid)
    .get();
  return user.data();
};

export const postReceived = async ({postId}) => {
  console.log(postId + 'postIDDd');
  const userPost = await firestore().collection('post').doc(postId).get();
  const userData = await firestore()
    .collection('user')
    .doc(userPost.data().userId)
    .get();
  return userData.data();
};

export const createCmt = async ({text, uid, postId, imageCmt}) => {
  const img = imageCmt ? await uploadImg(imageCmt) : '';
  try {
    const cmt = await firestore().collection('comments').add({
      content: text,
      userId: uid,
      postId: postId,
      image: img,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    const cmtId = cmt.id;
    const cmtData = await cmt.get();
    return {id: cmtId, ...cmtData.data()};
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getAllCmt = async () => {
  const data = [];
  try {
    const cmt = await firestore()
      .collection('comments')
      .orderBy('createAt', 'asc')
      .get();
    cmt.forEach(documentSnapshot => {
      data.push({
        id: documentSnapshot.id,
        ...documentSnapshot.data(),
      });
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAll = async () => {
  const data = [];
  try {
    const post = await firestore()
      .collection('post')
      .orderBy('createAt', 'desc')
      .get();
    post.forEach(documentSnapshot => {
      data.push({
        id: documentSnapshot.id,
        ...documentSnapshot.data(),
      });
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getAllAfterDel = async () => {
  const data = [];
  try {
    const post = await firestore()
      .collection('post')
      .orderBy('createAt', 'desc')
      .get();
    post.forEach(documentSnapshot => {
      data.push({
        id: documentSnapshot.id,
        ...documentSnapshot.data(),
      });
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async ({postId, content}) => {
  await firestore().collection('post').doc(postId).update({
    content: content,
  });
};

export const deletePost = async ({postId}) => {
  await firestore().collection('post').doc(postId).delete();
  const cmt = await firestore()
    .collection('comments')
    .where('postId', '==', postId)
    .get();
  if (cmt.size > 0) {
    cmt.forEach(documentSnapshot => {
      documentSnapshot.ref.delete();
    });
  }
};

export const uploadPost = async ({text, image}) => {
  const img = await uploadImg(image);
  const likes = [];
  const id = auth().currentUser.uid;
  try {
    await firestore().collection('post').add({
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
      content: text,
      imageUrl: img,
      like: likes,
      userId: id,
    });
    // const postDataId = data.id;
    // const post = getPost(postDataId);
    // return {id: postDataId, ...post};
  } catch (error) {
    console.log(error);
    // return false;
  }
};
