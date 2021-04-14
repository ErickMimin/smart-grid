import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import Colors from '../../constants/Colors';
const width = Dimensions.get('window').width / 3.5;

export default StyleSheet.create({
    data:{
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    spec:{
        backgroundColor: Colors.green,
        borderRadius: 10,
        padding: 5,
        width: width,
        textAlign: 'center'
    },
    reportsContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderColor: Colors.grey,
        borderBottomWidth: 1
    },
    reportsSubContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reportsTitle:{
        textAlign: 'center',
        padding: 10
    }
});