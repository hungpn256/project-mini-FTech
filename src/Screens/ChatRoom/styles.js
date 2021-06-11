import {Dimensions, StyleSheet} from 'react-native';
const widthWindow = Dimensions.get('window').width;
const styles = StyleSheet.create({
  card: {
    paddingVertical: 3,
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
  },
  titleStyle: {
    width: '100%',
  },
});
export default styles;
