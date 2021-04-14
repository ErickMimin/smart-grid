import React from 'react';
import { View, Text } from 'react-native';
import style from './style';

const CardsComponent: React.FC<any> = ({voltage, current, production}) => {
    const cards = [{
        title: 'Voltaje',
        value: voltage
    },{
        title: 'Corriente',
        value: current
    },{
        title: 'Producción',
        value: production
    }];
    return(
        <View
        style={style.data}>
            {cards.map((card, index) => (
                <View 
                key={index}>
                    <Text 
                    style={style.spec}>
                        {card.title}
                        {'\n'}
                        {card.value || 'N/A'}
                    </Text>
                </View>
            ))}
        </View>
    );
};

export default CardsComponent;