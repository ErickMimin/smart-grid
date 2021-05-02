import React, { useEffect } from "react";
import { View } from "react-native";
import { VictoryAxis, VictoryCandlestick, VictoryChart, VictoryTheme, VictoryZoomContainer } from "victory-native";
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
        //candleArray.filter((item: Array<any>) => item.length === candleWidth)
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
            setInterval(() => {
                dispatch(dashboardAction({}));
            }, 60000);
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
                <VictoryAxis tickFormat={(t) => `${t.getDate()}/${t.getMonth()}`}/>
                <VictoryAxis dependentAxis/>
                <VictoryCandlestick
                candleRatio={0.8}
                candleColors={{ positive: Colors.green, negative: Colors.red }}
                data={candleData || []}
                />
            </VictoryChart> 
        </View>
    )
}

export default RealChart;