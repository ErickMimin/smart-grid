import React from 'react';
import { View, StyleSheet } from 'react-native';
import { VictoryPie } from 'victory-native';
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
            <VictoryPie
            data={[
                { x: "Diciembre", y: 35 },
                { x: "Enero", y: 40 },
                { x: "Febrero", y: 55 }
            ]}
            />
        </View>
    );
};

export default Charts;