import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderRadius: 12,
    flexDirection: 'column',
    flex: 7,
    // backgroundColor: '#3498DB',
  },
  header1: {
    paddingLeft: '7%',
    paddingRight: '7%',
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#2E86C1',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 7,
    backgroundColor: '#3498DB',
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
  },
  body: {
    flex: 25,
    backgroundColor: 'white',
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    marginLeft: '2%',
    marginRight: '2%',
    flex: 8,
    backgroundColor: '#EAF2F8',
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
  },
});

export default styles;
