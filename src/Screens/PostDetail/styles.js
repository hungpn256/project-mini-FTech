import {Dimensions, StyleSheet} from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  container: {},
  skeletonHeader: {
    width: windowWidth * 1,
    height: windowHeight * 0.05,
  },
  skeletonAvatar: {
    marginTop: 20,
    width: 50,
    height: 50,
    borderRadius: 999,
  },
  skeletonAvatarCmt: {
    width: 50,
    height: 50,
    borderRadius: 999,
  },
  skeletonNameCmt: {
    marginLeft: 10,
    width: 150,
    borderRadius: 24,
    height: 50,
  },
  skeletonPost: {
    marginTop: 15,
    width: windowWidth * 1,
    height: windowHeight * 0.3,
  },
  skeletonName: {
    marginLeft: 10,
    width: 80,
    height: 20,
  },
  avatar: {
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 999,
    position: 'absolute',
  },
  cardAction: {
    justifyContent: 'space-evenly',
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingVertical: 10,
  },
  like: {
    color: '#696969',
    marginLeft: 3,
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
    flex: 1,
  },
  textHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.7,
  },
  cmts: {
    color: '#696969',
  },
  infoPost: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
