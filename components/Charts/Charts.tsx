import React from 'react';
import { View } from 'react-native';
import Swipe from '../../constants/Swipe';

const Charts: React.FC<any> = ({navigation}) => {
    const panResponder = Swipe({
        swipeLeft: () => {
            navigation.navigate('Home');
        },
        swipeRight: () => {
            navigation.navigate('Notifications');
        }
    });


    return(
        <View {...panResponder}>
            
        </View>
    );
};

export default Charts;