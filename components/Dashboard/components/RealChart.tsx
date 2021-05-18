import React, { useEffect, useRef } from "react";
import { View, Dimensions, ActivityIndicator } from 'react-native';
import { VictoryAxis, VictoryCandlestick, VictoryChart, VictoryLabel, VictoryLine, VictoryTheme, VictoryZoomContainer } from "victory-native";
import Colors from "../../../constants/Colors";


const RealChart: React.FC<any> = ({data = [], type = 'candle'}: {data: Array<any>, type: string}) => {
    if(type === 'candle' && data.length > 1 && data[0].hasOwnProperty('high'))
        return(
            <View>
                <VictoryChart
                theme={VictoryTheme.material} 
                domainPadding={{ x: 10 }}
                scale={{ x: "time" }}
                containerComponent={
                    <VictoryZoomContainer
                    zoomDimension="x"/>}>
                    <VictoryLabel 
                        text="Producción diaria" 
                        x={Dimensions.get('window').width / 2} 
                        y={30} 
                        textAnchor="middle"
                        style={{fontWeight: 800}}/>
                    <VictoryAxis 
                        tickFormat={(t: Date) => `${t.getDate()}/${t.getHours()}h`}
                        label="Tiempo"
                        style={{tickLabels: {padding: 5}, axisLabel: {padding: 30}}}/>
                    <VictoryAxis 
                        dependentAxis 
                        label="KVAh" 
                        style={{tickLabels: {padding: 5}, axisLabel: {padding: 30}}}/>
                    <VictoryCandlestick
                        candleRatio={0.8}
                        candleColors={{ positive: Colors.green, negative: Colors.red }}
                        data={data}/>
                </VictoryChart> 
            </View>
        )
    if(type === 'lineal' && data.length > 0 && data[0].hasOwnProperty('y'))
        return(
            <View>
                <VictoryChart
                theme={VictoryTheme.material} 
                domainPadding={{ x: 10 }}
                scale={{ x: "time" }}
                containerComponent={
                    <VictoryZoomContainer
                    zoomDimension="x"/>}>
                    <VictoryLabel 
                        text="Producción diaria" 
                        x={Dimensions.get('window').width / 2} 
                        y={30} 
                        textAnchor="middle"
                        style={{fontWeight: 800}}/>
                    <VictoryAxis 
                        tickFormat={(t: Date) => `${t.getDate()}/${t.getHours()}h`}
                        label="Tiempo"
                        style={{tickLabels: {padding: 5}, axisLabel: {padding: 30}}}/>
                    <VictoryAxis 
                        dependentAxis 
                        label="KVAh" 
                        style={{tickLabels: {padding: 5}, axisLabel: {padding: 30}}}/>
                    <VictoryLine
                        interpolation="natural"
                        style={{
                            data: { stroke: Colors.green }
                        }}
                        data={data}/>
                </VictoryChart> 
            </View>
        )
    return(
        <View>
            <ActivityIndicator 
            size="large" 
            color={Colors.primary}
            style={{marginVertical: 20}}/>
        </View>
    )
}

export default RealChart;