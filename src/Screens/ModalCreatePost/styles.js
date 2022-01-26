import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    marginHorizontal: 0,
  },
  userName: {
    marginLeft: 10,
    color: 'black',
    fontSize: 16,
  },
  photoBtn: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hide: {
    display: 'none',
  },
  closeModal: {
    padding: 5,
    position: 'absolute',
    top: '50%',
    zIndex: 999,
    left: 0,
    marginLeft: 10,
  },
  img: {
    resizeMode: 'contain',
    flex: 1,
    width: 300,
    height: 300,
  },

  imgWrapper: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  inner: {
    position: 'relative',
    borderRadius: 15,
    padding: 20,
    flex: 1,
  },
  inputView: {
    flex: 1,
  },
  postGroup: {
    flex: 1,
  },
  header: {
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    position: 'relative',
  },
  text: {
    fontSize: 18,
    color: '#28313b',
  },
  textHeader: {
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
  },
  input: {
    borderRadius: 20,
    paddingVertical: 10,
    color: '#28313b',
  },
  actionBottom: {
    justifyContent: 'space-around',
  },
  colorText: {
    color: '#696969',
  },
  actionBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
  closeBtn: {
    padding: 5,
    borderRadius: 9999,
    position: 'absolute',
    backgroundColor: '#4169e1',
    top: -10,
    zIndex: 999,
    right: 4,
  },
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  viewModal: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
