import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: '#F1F1F1',
    borderBottomWidth: 1,
  },
  groupBtn: {
    flexDirection: 'row',
  },
  icon: {
    padding: 10,
  },
  wrapperIcon: {
    backgroundColor: '#eee',
    borderRadius: 999,
    marginHorizontal: 6,
  },
  viewModal: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
