import {Dimensions, StyleSheet} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fff',
  },

  image: {
    position: 'relative',
    height: 290,
  },
  wrapperCover: {
    width: '100%',
    height: 250,
  },
  cover: {
    width: '100%',
    height: 250,
  },
  wrapperAvatar: {
    position: 'absolute',
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 5,
    left: '50%',
    bottom: 0,
    transform: [{translateX: -80}],
  },
  avatar: {
    height: 160,
    width: 160,
    borderRadius: 50,
  },
  name: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  infor: {
    flexDirection: 'row',

    borderBottomColor: 'rgba(0,0,0,0.4)',
    borderBottomWidth: 1,
  },
  inforItem: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 10,
  },
  inforItemTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#777',
    marginTop: 20,
  },
  inforItemNumber: {
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 20,
  },
  selectorTab: {
    flexDirection: 'row',
  },
  textHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#777',
    padding: 8,
  },
  txtActive: {
    color: '#333',
  },
  btnActive: {
    backgroundColor: '#D6EAF8',
    borderRadius: 999,
    padding: 0,
    marginVertical: 5,
  },
  photosImages: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
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
    padding: 4,
    borderRadius: 4,
  },
  photosImageItem: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
  modalImage: {
    flex: 1,
  },
  imageInModal: {
    flex: 1,
    resizeMode: 'contain',
  },
  viewContent: {
    backgroundColor: '#f0f2f5',
  },
});
export default styles;
