import {Dimensions, StyleSheet} from 'react-native';

const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#191720',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'center',
  },
  container: {
    height: windowHeight - 30,
    paddingHorizontal: 20,
  },
  textHeader: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '700',
    lineHeight: 80,
  },
  text: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '500',
    lineHeight: 40,
  },
  formInput: {
    flex: 1,
    marginTop: 70,
  },
  input: {
    color: '#ccc',
    borderColor: '#ccc',
    borderWidth: 0.5,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  textRegister: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonSignup: {
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
    height: 50,
    borderRadius: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  viewModal: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
