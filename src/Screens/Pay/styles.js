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
<<<<<<< HEAD
    height: 50,
=======
    height: 70,
  },
  pessableHome: {
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
>>>>>>> c82bfe3f76719c45129ed89744a44f5f85c93c91
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666869',
    marginTop: 4,
  },
  body: {
    flex: 1,
    maxHeight: 500,
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
    height: '33%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  footer: {
    borderRadius: 5,
    height: 135,
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default styles;
