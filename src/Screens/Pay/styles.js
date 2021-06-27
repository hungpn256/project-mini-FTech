import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({

  header1: {
    paddingRight: '7%',
    flexDirection: 'row',
    backgroundColor: '#4169e1',
    alignItems: 'center',
    marginLeft: '1.5%',
    marginRight: '1.5%',
    justifyContent: 'space-between',
  },

  header2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#4169e1',
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
    height: '35%',
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
    height: '29%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  footer: {
    marginHorizontal:'1.5%',
    borderRadius: 5,
    height: '16%',
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
