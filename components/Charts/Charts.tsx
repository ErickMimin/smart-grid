import React from 'react';
import { View, StyleSheet } from 'react-native';
import { VictoryPie } from 'victory-native';

const Charts: React.FC<{}> = () => {
    return(
        <View>
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