import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderRadius: 12,
    flexDirection: 'column',
    flex: 8,
  },
  header1: {
    paddingLeft: '7%',
    paddingRight: '7%',
    flex: 3,
    flexDirection: 'row',
    backgroundColor: '#4169e1',
    alignItems: 'center',
    marginLeft: '1.5%',
    marginRight: '1.5%',
  },
  header2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 7,
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
    fontSize: 18,
  },
  body: {
    flex: 25,
    backgroundColor: 'white',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: '1.5%',
    borderWidth: 1,
    borderColor: '#AEB6BF',
    borderRadius: 5,
  },
  touchOpacityBody: {
    marginTop: '4%',
    marginLeft: '3%',
    borderRadius: 5,
    width: '29%',
    height: '29%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  footer: {
    marginLeft: '1.5%',
    marginRight: '1.5%',
    flex: 8,
    borderRadius: 5,
  },
  child: {
    flex: 1,
    width: windowWidth,
    justifyContent: 'center',
  },
  imageCarousel: {
    flex: 1,
    width: windowWidth,
    resizeMode: 'stretch',
    borderRadius: 5,
  },
  modalView: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: windowWidth,
  },
});

export default styles;
