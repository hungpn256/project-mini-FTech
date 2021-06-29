import {Dimensions, StyleSheet} from 'react-native';
const widthWindow = Dimensions.get('window').width;
const styles = StyleSheet.create({
  card: {
    marginTop: 3,
    paddingHorizontal: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
  },
  wrapperTitle: {
    width: 300,
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 12,
  },
  avatar: {
    margin: 0,
  },
  wrapperAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  friendWrapper: {
    backgroundColor: '#fff',
    minWidth: widthWindow,
    marginTop: 5,
  },
  titleStyle: {
    width: '100%',
  },
  textUnread: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 15,
  },
});
export default styles;
