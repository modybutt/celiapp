import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    title: {
    fontsize: 20,
    fontFamily: 'space-mono'
   },
   activeTittextle: {
     color: 'black',
     fontsize: 10
   },
   bubble: {
       width: 0,
       height: 0,
       marginLeft: 33,
       borderLeftWidth: 10,
       borderRightWidth: 25,
       borderBottomWidth: 10,
       backgroundColor: 'transparent',
       borderLeftColor: 'transparent',
       transform: [{ rotate: '45deg'}]
   },
   message: {
       backgroundColor: '#fff',
       borderWidth: 5, 
       borderRadius: 33, 
       textAlignVertical: 'center',
       padding: 10,
       paddingLeft: 20,
       width: '50%',
       fontFamily: 'space-mono'
   },
   symptomGroup:{
       height:200,
       width:300,
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'stretch',
   },
   symptomIcon:{
       height:200,
       width:200,
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'stretch',
   }
 });