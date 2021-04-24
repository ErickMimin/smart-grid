import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import Colors from '../../constants/Colors';

export default StyleSheet.create({
   container:{
       paddingVertical: 20,
       paddingHorizontal: 30,
       borderBottomWidth: 1,
       borderColor: Colors.grey
   },
   titleText:{
       fontSize: 18,
       fontWeight: '400',
       color: Colors.primary
   }
});