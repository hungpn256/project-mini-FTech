import {StyleSheet, Dimensions} from 'react-native';
const heightWindow = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    minHeight: heightWindow,
    backgroundColor: '#fff',
  },
  overlay: {
    flex: 1,
    paddingHorizontal: 20,
  },
  LogoSize: {backgroundColor: '#1777F2'},
  LogoText: {
    fontSize: 50,
  },
  textStyle: {
    color: '#696969',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  LogoStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 40,
    marginBottom: 40,
  },
  btn: {
    flex: 1,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginBottom: 10,
  },
  quote: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textQuote: {
    color: '#696969',
    fontStyle: 'italic',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  // background: {
  //   flex: 1,
  //   backgroundColor: '#191720',
  // },
  // backgroundImage: {
  //   flex: 1,
  //   resizeMode: 'center',
  // },
  // container: {
  //   height: windowHeight - 30,
  //   paddingHorizontal: 20,
  // },
  // textHeader: {
  //   color: '#fff',
  //   fontSize: 40,
  //   fontWeight: '700',
  //   lineHeight: 80,
  // },
  // text: {
  //   color: '#fff',
  //   fontSize: 32,
  //   fontWeight: '500',
  //   lineHeight: 40,
  // },
  // formInput: {
  //   flex: 1,
  //   marginTop: 70,
  // },
  // input: {
  //   color: '#ccc',
  //   borderColor: '#ccc',
  //   borderWidth: 0.5,
  //   borderRadius: 10,
  //   marginVertical: 10,
  //   paddingHorizontal: 20,
  // },
  // textRegister: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginVertical: 10,
  // },
  // buttonSignup: {
  //   backgroundColor: '#fff',
  //   color: '#000',
  //   fontSize: 16,
  //   fontWeight: '700',
  //   height: 50,
  //   borderRadius: 10,
  //   textAlign: 'center',
  //   textAlignVertical: 'center',
  // },
});
export default styles;
