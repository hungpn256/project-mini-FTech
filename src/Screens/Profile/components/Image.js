import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {MODAL_CHANGE_STATE} from '../../Modal/constant';
function ImageComponent({item}) {
  const dispatch = useDispatch();
  return (
    <View style={styles.photosItem}>
      {item ? (
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.photosImageItem}
          onPress={() => {
            dispatch({
              type: MODAL_CHANGE_STATE,
              payload: {image: item.imageUrl},
            });
          }}>
          <Image
            style={styles.photosImageItem}
            source={{
              uri: item.imageUrl,
            }}
          />
        </TouchableOpacity>
      ) : (
        <Text>loading...</Text>
      )}
    </View>
  );
}
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  photosItem: {
    width: windowWidth / 3 - 2,
    aspectRatio: 1 / 1,
    padding: 5,
    margin: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    position: 'relative',
  },
  btnDeleteImg: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    padding: 2,
    borderRadius: 4,
  },
  photosImageItem: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
});
export default React.memo(ImageComponent);
