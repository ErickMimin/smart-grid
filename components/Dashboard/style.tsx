import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import Colors from '../../constants/Colors';
const width = Dimensions.get('window').width * .28;

export default StyleSheet.create({
    modalContainer:{
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 20,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2
          },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        textAlign: 'center',
        color: Colors.primary,
        padding: 10
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    data:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'stretch'
    },
    spec:{
        backgroundColor: Colors.green,
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 10,
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
    }
});