import {StyleSheet} from 'react-native';
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
   },
   picker:{
       width: 100,
       borderColor: Colors.grey,
       borderWidth: 2,
   },
   pickerContainer: {
       flex: 1,
       flexDirection: 'row',
       flexWrap: 'wrap',
       alignItems: 'center'
   }
});