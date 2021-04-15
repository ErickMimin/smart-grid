import React from 'react';
import { View } from 'react-native';
import Swipe from '../../constants/Swipe';

const Settings: React.FC<any> = ({navigation}) => {
    const panResponder = Swipe({
        swipeLeft: () => {
            navigation.navigate('Notifications');
        },
        swipeRight: null
    });
    return(
        <View>
            
        </View>
    );
};

export default Settings;