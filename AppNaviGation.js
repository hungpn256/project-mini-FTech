import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import NoInternetModal from './src/Components/NoInternetModal';
import Loading from './src/Components/SplashScreen/index';
import AuthStack from './src/Navigator/AuthStack';
import MainStack from './src/Navigator/MainStack';
import {USER_DEL, USER_SET} from './src/Screens/Auth/constants';
import ModalComponent from './src/Screens/Modal';
import ModalCreatePost from './src/Screens/ModalCreatePost';
import ModalPostConfig from './src/Screens/ModalPostConfig';
export default function AppNavigator() {
  const userData = useSelector(state => state.auth.user);
  const post = useSelector(state => state.home.post);
  const dispatch = useDispatch();
  const load = useSelector(state => state.auth.splashScreen);

  const saveId = async uid => {
    const token = await messaging().getToken();
    console.log(token + 'TOKEN');
    await AsyncStorage.setItem('USER_ID', JSON.stringify(uid));
  };

  const removeId = async () => {
    await AsyncStorage.removeItem('USER_ID');
  };

  useEffect(() => {
    // (async () => {
    // let user, getpost;
    // try {
    // user = JSON.parse(await AsyncStorage.getItem('user'));
    // getpost = JSON.parse(await AsyncStorage.getItem('post'));
    // } catch (e) {
    // console.log(e, 'get data fail');
    // }
    // console.log('get', user, getpost);
    // if (user) {
    // dispatch({
    //   type: GET_USER_SUCCESS,
    //   payload: {user},
    // });
    // }
    // if (getpost) {
    // dispatch({type: ALL_POST, payload: {data: getpost}});
    // }
    // })();
    (() => {
      auth().onAuthStateChanged(function (user) {
        if (user) {
          saveId(user.uid);
        } else {
          removeId();
        }
      });
    })();
    const check = async () => {
      const data = await AsyncStorage.getItem('USER_ID');
      if (data !== null) {
        dispatch({type: USER_SET});
      } else {
        dispatch({type: USER_DEL});
      }
    };
    check();
    // dispatch({type: LOGOUT});
  }, []);
  // useEffect(() => {
  //   (async () => {
  //     if (userData) {
  //       const userData_ = {...userData};
  //       delete userData_.friend;
  //       try {
  //         await AsyncStorage.setItem('user', JSON.stringify(userData_));
  //       } catch (error) {
  //         console.log('user', error);
  //       }
  //     } else {
  //       console.log('user remove');
  //       // await AsyncStorage.removeItem('user');
  //     }
  //   })();
  // }, [userData]);
  // useEffect(() => {
  //   console.log(post, 'post change');
  //   (async () => {
  //     if (userData && post) {
  //       console.log('post set local');
  //       try {
  //         let post_ = [...post];
  //         post_ = post_.slice(0, 2).map(item => {
  //           return {...item, createAt: item.createAt?.toDate()};
  //         });
  //         await AsyncStorage.setItem('post', JSON.stringify(post_));
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     } else {
  //       console.log('post remove');
  //       // await AsyncStorage.removeItem('post');
  //     }
  //   })();
  // }, [post]);
  const [isOffline, setOfflineStatus] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
      console.log('sdasd', offline);
    });
    setTimeout(() => {
      setReady(true);
    }, 3000);
    return () => removeNetInfoSubscription();
  }, []);

  const fetchUsers = useCallback(() => {
    setLoading(true);
    firestore()
      .collection('user')
      .get()
      .then(() => {
        isOffline && setOfflineStatus(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isOffline]);

  return load || isOffline || !ready ? (
    <>
      <Loading />
      {isOffline && (
        <NoInternetModal
          show={isOffline}
          onRetry={fetchUsers}
          isRetrying={isLoading}
        />
      )}
    </>
  ) : (
    <>
      {userData ? (
        <>
          <ModalCreatePost />
          <ModalPostConfig />
          <MainStack />
          <ModalComponent />
        </>
      ) : (
        <AuthStack />
      )}
    </>
  );
}
