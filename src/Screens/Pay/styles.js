import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header1: {
    paddingRight: '7%',
    flexDirection: 'row',
    backgroundColor: '#1777F2',
    alignItems: 'center',
    marginLeft: '1.5%',
    marginRight: '1.5%',
    justifyContent: 'space-between',
  },

  header2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1777F2',
    marginLeft: '1.5%',
    marginRight: '1.5%',
    borderBottomEndRadius: 5,
    borderBottomLeftRadius: 5,
  },

  touchOpacityHeader: {
    marginLeft: '3%',
    marginBottom: '3%',
    marginTop: '3%',
    width: '20%',
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

  body: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: '1.5%',
    borderWidth: 1,
    borderColor: '#AEB6BF',
    borderRadius: 5,
  },

  touchOpacityBody: {
    marginTop: '1%',
    marginHorizontal: '2%',
    borderRadius: 5,
    width: '29%',
    height: '32%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  footer: {
    marginHorizontal: '1.5%',
    borderRadius: 5,
    height: '26%',
  },

  child: {
    width: windowWidth,
    justifyContent: 'center',
  },

  imageCarousel: {
    width: windowWidth,
    resizeMode: 'contain',
    borderRadius: 5,
  },

  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth,
  },
});

export default styles;
