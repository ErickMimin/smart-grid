import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import Colors from '../../constants/Colors';
const width = Dimensions.get('window').width * .28;

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    data:{
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    spec:{
        backgroundColor: Colors.green,
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 10,
        width: width,
        textAlign: 'center',
        fontFamily: 'Roboto'
    },
    number:{
        fontSize: 20
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
        padding: 10,
        fontFamily: 'Roboto'
    }
});