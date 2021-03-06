import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  background:{
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay:{
    paddingHorizontal:20,
    backgroundColor:'rgba(27,30,35 ,0.7)',
  },
  LogoSize:{
    width:170,height:170
  },
  textStyle:{
    color:'white',
    textAlign:'center',
    fontSize:16,
    marginTop:20
  },
  LogoStyle:{
    alignItems:'center',
    justifyContent:'center',
    flex:2,
    marginTop:40,
    marginBottom:40
},
btn:{
  flex:1,
  marginBottom:10,
},
input:{
  flex:1,
  marginBottom:10
},
quote:{
  flex:1,
  alignItems:'center',
  justifyContent:'center',
},
textQuote:{
  color:'white',
  fontStyle:'italic',
  fontSize:18,
  textAlign:'center',
  marginBottom:20
},
  // background: {
  //   flex: 1,
  //   backgroundColor: '#191720',
  // },
  // backgroundImage: {
  //   flex: 1,
  //   resizeMode: 'center',
  // },
  // container: {
  //   height: windowHeight - 30,
  //   paddingHorizontal: 20,
  // },
  // textHeader: {
  //   color: '#fff',
  //   fontSize: 40,
  //   fontWeight: '700',
  //   lineHeight: 80,
  // },
  // text: {
  //   color: '#fff',
  //   fontSize: 32,
  //   fontWeight: '500',
  //   lineHeight: 40,
  // },
  // formInput: {
  //   flex: 1,
  //   marginTop: 70,
  // },
  // input: {
  //   color: '#ccc',
  //   borderColor: '#ccc',
  //   borderWidth: 0.5,
  //   borderRadius: 10,
  //   marginVertical: 10,
  //   paddingHorizontal: 20,
  // },
  // textRegister: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginVertical: 10,
  // },
  // buttonSignup: {
  //   backgroundColor: '#fff',
  //   color: '#000',
  //   fontSize: 16,
  //   fontWeight: '700',
  //   height: 50,
  //   borderRadius: 10,
  //   textAlign: 'center',
  //   textAlignVertical: 'center',
  // },
  viewModal: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
