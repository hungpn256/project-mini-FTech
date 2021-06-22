import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#fff',
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
  },
  icon: {
    position: 'absolute',
    top: 10,
    padding: 5,
  },
  textHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#242424',
  },
  wrapperUser: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 18,
    marginLeft: 12,
    marginTop: 4,
  },
  action: {
    flexDirection: 'row',
    marginLeft: 8,
    marginTop: 4,
  },
  btn: {
    margin: 5,
    width: '40%',
  },
  requestText: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 10,
  },
  wrapperTab: {
    flexDirection: 'row',
  },
  tabBtn: {},
  tabTxt: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#dde',
    margin: 5,
    marginBottom: 0,
    fontWeight: 'bold',
    color: '#333',
  },
});
export default styles;
