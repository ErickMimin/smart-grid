import React from 'react';
import { View, Text } from 'react-native';
import style from '../style';

const CardsComponent: React.FC<any> = ({voltage, current, production}) => {
    const cards = [{
        title: 'Voltaje',
        measure: 'V',
        value: voltage
    },{
        title: 'Corriente',
        measure: 'A',
        value: current
    },{
        title: 'Producción',
        measure: 'KWh',
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
                        {card.title + '\n'}
                        <Text
                        style={style.number}>
                            {`${card.value} ${card.measure}` || 'N/A'}
                        </Text>
                    </Text>
                </View>
            ))}
        </View>
    );
};

export default CardsComponent;