import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center'},
  background: {
    height: 250,
    width: '100%',
  },
  wrapperBackground: {
    height: 180,
    width: '100%',
  },
  menu: {
    width: '90%',
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 6,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 10,
  },
  wrapperAvatar: {
    padding: 2,
    backgroundColor: '#fff',
    transform: [{translateY: -80}],
    borderRadius: 999,
  },
  main: {
    transform: [{translateY: -80}],
    width: '90%',
  },
  name: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#696969',
    marginLeft: 8,
    paddingVertical: 15,
  },
});
export default styles;
