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
    height: 240,
    borderBottomColor: '#eee',
    borderBottomWidth: 2,
  },
  cover: {
    width: '100%',
    height: 240,
  },
  wrapperAvatar: {
    position: 'absolute',
    borderRadius: 999,
    borderColor: '#EEEEEE',
    borderWidth: 4,
    left: '50%',
    bottom: 0,
    transform: [{translateX: -90}],
  },
  avatar: {
    height: 180,
    width: 180,
    borderRadius: 999,
  },
  name: {
    fontFamily: 'SourceSansPro-SemiBoldItalic',
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 15,
  },
  infor: {
    flexDirection: 'row',
    borderTopColor: 'rgba(0,0,0,0.1)',
    borderTopWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
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
    color: '#333',
    padding: 8,
  },
  txtActive: {
    color: '#1777F2',
  },
  btnActive: {
    backgroundColor: '#D6EAF8',
    borderRadius: 999,
    padding: 0,
  },
  photosImages: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
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
    backgroundColor: '#eeeeee',
  },
  btnGroup: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  btn: {
    flex: 1,
    margin: 5,
    backgroundColor: '#1777F2',
    height: 43,
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
  },
  titleEditModal: {
    fontWeight: '500',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
  },
  formItem: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 16,
    fontWeight: '700',
  },
  input: {
    borderBottomWidth: 1,
    marginHorizontal: 10,
    borderBottomColor: 'rgba(0,0,0,0.5)',
    fontSize: 16,
    paddingVertical: 4,
    color: 'rgba(0,0,0,0.7)',
  },
  textDate: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    borderRadius: 4,
    width: 50,
    height: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingHorizontal: 5,
    fontSize: 16,
    marginHorizontal: 2,
    color: 'rgba(0,0,0,0.7)',
  },
  textDone: {
    color: '#1777F2',
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  arrowBack: {
    position: 'absolute',
    top: 10,
    padding: 10,
    zIndex: 999,
  },
  picker: {
    marginBottom: -16,
    marginTop: -10,
  },
});
export default styles;
