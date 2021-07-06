import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  header: {
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    position: 'relative',
  },
  textHeader: {
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
  },
  closeModal: {
    padding: 5,
    position: 'absolute',
    top: '50%',
    zIndex: 999,
    left: 0,
    marginLeft: 10,
  },
  userName: {
    marginLeft: 12,
    fontSize: 16,
  },
  avatarLike: {
    borderRadius: 23,
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
