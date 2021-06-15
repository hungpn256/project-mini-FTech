import {Dimensions, StyleSheet} from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  container: {},
  cardAction: {
    justifyContent: 'space-evenly',
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingVertical: 10,
  },
  cover: {
    height: windowHeight * 0.35,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  actionText: {
    fontSize: 15,
    marginLeft: 5,
    fontWeight: '700',
  },
  header: {
    padding: 12,
    borderBottomColor: '#F1F1F1',
    borderBottomWidth: 1,
    position: 'relative',
  },
  wrapper: {
    backgroundColor: 'white',
  },
  textHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.7,
  },
  iconHeader: {
    position: 'absolute',
    top: '50%',
    left: 10,
  },
  content: {
    marginVertical: 8,
  },
  cmtWrapper: {
    flex: 1,
    padding: 10,
    marginBottom: 5,
  },
  cmt: {
    marginLeft: 8,
    padding: 10,
    borderRadius: 18,
    paddingHorizontal: 10,
    backgroundColor: '#f0f2f5',
  },
  imgCmt: {
    borderRadius: 18,
    width: windowWidth * 0.6,
    height: windowHeight * 0.4,
  },
  cmtGroup: {marginTop: 4, marginLeft: 50},
  AvatarCmt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
