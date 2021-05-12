import React from 'react';
import { View, Text } from 'react-native';
import style from '../style';

const CardsComponent: React.FC<any> = ({voltage, current, production}) => {
    const cards = [{
        title: 'Voltaje',
        measure: 'Volts',
        value: voltage
    },{
        title: 'Corriente',
        measure: 'Ampers',
        value: current
    },{
        title: 'Producción',
        measure: 'kVAh',
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
                        style={{fontSize: 20}}>
                            {`${card.value.toFixed(2)}\n${card.measure}`}
                        </Text>
                    </Text>
                </View>
            ))}
        </View>
    );
};

export default CardsComponent;