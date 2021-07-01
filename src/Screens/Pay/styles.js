import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header1: {
    paddingRight: 30,
    flexDirection: 'row',
    backgroundColor: '#1777F2',
    alignItems: 'center',
    marginHorizontal: 8,
    justifyContent: 'space-between',
    height: 50,
  },
  header2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    backgroundColor: '#1777F2',
    marginHorizontal: 8,
    borderBottomEndRadius: 5,
    borderBottomLeftRadius: 5,
    paddingBottom: 15,
  },

  touchOpacityHeader: {
    borderRadius: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textHeader: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },

  textHeader1: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  textBody: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666869',
  },
  body: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 8,
    borderColor: '#AEB6BF',
    borderRadius: 5,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
  },

  touchOpacityBody: {
    borderRadius: 5,
    width: windowWidth / 3 - 20,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  footer: {
    borderRadius: 5,
    height: 135,
    alignItems: 'center',
  },
});

export default styles;
