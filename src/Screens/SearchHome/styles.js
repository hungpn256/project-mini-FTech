import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  input: {
    backgroundColor: '#DCDCDC',
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 10,
    flex: 1,
  },
  searchGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {color: '#696969'},
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: '#DCDCDC',
  },
  userName: {
    fontSize: 16,
    marginLeft: 10,
  },
  results: {
    marginTop: 20,
  },
});
