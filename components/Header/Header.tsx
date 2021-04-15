import React from 'react';
import Colors from '../../constants/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { View, Pressable, StyleSheet } from 'react-native';
import { faHome, faChartPie, faBell, faBars } from '@fortawesome/free-solid-svg-icons';

const style = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    }, pressable:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomColor: Colors.secondary,
        paddingBottom: 10,
        minWidth: 28
    }, active:{
        borderBottomWidth: 2
    }
  });

const Header: React.FC = (props) =>{
    const navigation = useNavigation();
    return(
        <View
        style={style.container}>
            {[{
                name: 'Home',
                icon: faHome
            },{
                name: 'Charts',
                icon: faChartPie
            },{
                name: 'Notifications',
                icon: faBell
            },{
                name: 'Settings',
                icon: faBars
            }].map((element, index) => (
                <Pressable
                onPress={() => navigation.navigate(element.name)}
                key={index}
                style={[style.pressable, element.name === props.children ? style.active : null]}>
                    <FontAwesomeIcon 
                    size={26}
                    color={element.name === props.children ? Colors.secondary : Colors.white}
                    icon={element.icon}
                    />
                </Pressable>
            ))}
        </View>
    );
}

export default Header;