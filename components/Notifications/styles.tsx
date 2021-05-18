import {StyleSheet, StatusBar} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        margin: 5
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 20
    },
    content:{
        flex: 1,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 'auto'
    },
    title: {
        fontSize: 16,
        fontWeight: '500'
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
  });