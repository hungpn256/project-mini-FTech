import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmWrapper: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  confirm: {
    flexDirection: 'row',
  },
  innerModal: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1100,
    margin: 'auto',
    padding: 15,
    position: 'absolute',
    borderRadius: 14,
    backgroundColor: 'white',
    width: windowWidth * 0.6,
  },
  inner: {
    flex: 1,
    zIndex: 999,
    width: windowWidth * 1,
    height: windowHeight * 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  boxInner: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    margin: 'auto',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    width: windowWidth * 1,
    height: windowHeight * 0.25,
  },
  btn: {
    width: windowWidth * 0.6,
    textAlign: 'center',
    backgroundColor: '#1777F2',
    color: 'white',
    paddingVertical: 10,
    fontSize: 16,
    borderRadius: 23,
  },
});
