import React, { useEffect } from "react";
import { View, Dimensions } from 'react-native';
import { VictoryAxis, VictoryCandlestick, VictoryChart, VictoryLabel, VictoryTheme, VictoryZoomContainer } from "victory-native";
import Colors from "../../../constants/Colors";
import {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { dashboardAction } from "../../../redux/actions/dashboard";
import { dashboardProduction } from "../../../redux/selectors";


const RealChart: React.FC<any> = ({data = [], candleWidth}: {data: Array<any>, candleWidth:number}) => {
    const dispatch = useDispatch();
    const [candleData, setCandleData] = useState<Array<any>>([]);
    const [newData, setNewData] = useState<Array<any>>([]);
    const production = useSelector(state => dashboardProduction(state)); 

    const handleData = () =>{
        const candleArray: Array<any> = [];
        const currentDate = new Date().getTime() - (data.length * 60000);
        // Slice in subArrays
        let auxArray: Array<any> = [];
        data.forEach((item, index) => {
            if((index  + 1) % (candleWidth + 1) === 0){
                candleArray.push(auxArray);
                auxArray = [];
            }else
            auxArray.push(item);
        });
        if(candleArray[candleArray.length - 1].length < candleWidth)
            setNewData(candleArray.pop());
        // Get Data for the unit candle
        return candleArray.map((candle, index, array) => {
            const open = index > 0 ? array[index - 1][candleWidth - 1].value : candle[0].value;
            return {
                x: new Date(currentDate + candleWidth * index * 60000),
                open,
                close: candle[candleWidth - 1].value,
                high: Math.max(...(candle.map((x: any) => x.value))),
                low: Math.min(...(candle.map((x: any) => x.value)))
            };
        }); 
    }

    useEffect(()=>{
        if(production != null)
            newData.push(production)
        if(newData.length === candleWidth){
            candleData.push({
                x: new Date(),
                open: candleData[candleData.length - 1].close,
                close: newData[candleWidth - 1],
                high: Math.max(...(newData.map((x: any) => x))),
                low: Math.min(...(newData.map((x: any) => x)))
            })
            setNewData([]);
        }
    }, [production]);

    useEffect(()=>{
        if(data && data.length > 0){
            setCandleData(handleData())
        }
    }, [data])

    return(
        <View>
            <VictoryChart
            theme={VictoryTheme.material} 
            domainPadding={{ x: 10 }}
            scale={{ x: "time" }}
            containerComponent={
                <VictoryZoomContainer />}>
                <VictoryLabel 
                    text="Producción diaria" 
                    x={Dimensions.get('window').width / 2} 
                    y={30} 
                    textAnchor="middle"
                    style={{fontWeight: 800}}/>
                <VictoryAxis 
                    tickFormat={(t: Date) => `${t.getDate()}-${t.getHours()}:${t.getMinutes()}`}
                    label="Tiempo"
                    style={{tickLabels: {padding: 5}, axisLabel: {padding: 30}}}/>
                <VictoryAxis 
                    dependentAxis 
                    label="KVAh" 
                    style={{tickLabels: {padding: 5}, axisLabel: {padding: 30}}}/>
                <VictoryCandlestick
                candleRatio={0.8}
                candleColors={{ positive: Colors.green, negative: Colors.red }}
                data={candleData}
                />
            </VictoryChart> 
        </View>
    )
}

export default RealChart;