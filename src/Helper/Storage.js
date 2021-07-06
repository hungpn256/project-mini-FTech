import AsyncStorage from '@react-native-async-storage/async-storage';

export const KEY_STORAGE = {
  user: 'user',
  post: 'post',
};
export const setItem = async (key, value) => {
  try {
    if (JSON.stringify(value)) {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } else {
      throw new Error('convert string fail.');
    }
  } catch (error) {
    console.log('conver string fail.', error);
  }
};

export const getItem = async key => {
  try {
    if (key) {
      const res = await AsyncStorage.getItem(key);
      if (res) {
        return res;
      }
      throw new Error('Get fail');
    }
  } catch (error) {
    console.log('conver string fail.', error);
  }
};
