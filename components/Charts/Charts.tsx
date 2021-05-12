import React, { useEffect, useState } from 'react';
import { Switch, View, Text, Button, SafeAreaView } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { formatDateWithDay, formatMonth, formatDate } from '../../constants/formatDate';
import { useDispatch, useSelector } from 'react-redux';
import { chartsDayAction } from '../../redux/actions/chartsDay';

import Style from './Style';
import Colors from '../../constants/Colors';
import { chartDayData, chartMonthData } from '../../redux/selectors/index';
import { chartsMonthAction } from '../../redux/actions/chartsMonth';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';
import { FileDownloader } from '../../redux/api';

const DAYS = 31;
const MONTHS = 12;

const DayArray = (offset: number) => {
    const dayArray: Array<Date> = [];
    const currentDate = new Date().getDate();
    for(let i = currentDate - offset; i < currentDate; i++){
        const newDay = new Date();
        newDay.setDate(i);
        dayArray.push(newDay);
    }
    return dayArray;
}

const MonthArray = (offset: number) => {
    const monthArray: Array<Date> = [];
    const currentDate = new Date().getMonth();
    for(let i = currentDate - offset; i < currentDate; i++){
        const newMonth = new Date();
        newMonth.setMonth(i);
        monthArray.push(newMonth);
    }
    return monthArray;
}

const MapData = (data: Array<any>) => {
    return data.map((item)=>({
        x: new Date(item.date),
        y: item.production
    }));
}

const downloadFileMonth = async (init: Date, final: Date) => {
    FileDownloader(`charts/months/download/${init.toISOString()}/${final.toISOString()}`, `reportsMonth${formatMonth(init)}-${formatMonth(final)}.pdf`)
};

const downloadFileDay = async (init: Date, final: Date) => {
    FileDownloader(`charts/days/download/${init.toISOString()}/${final.toISOString()}`, `reportsDay${formatDate(init)}-${formatDate(final)}.pdf`)
};

const Charts: React.FC<any> = ({navigation}) => {
    const [type, setType] = useState(false); // false => Day, true => Month
    const [arrayData, setArrayData] = useState<any>({days: {init: DayArray(DAYS), final: []}, months: {init: MonthArray(MONTHS), final: []}});
    const [data, setData] = useState({days: {init: 0, final: 0}, months: {init: 0, final: 0}});
    const toggleSwitch = () => setType(previousState => !previousState);
    const dispatch = useDispatch();
    const dayData = useSelector(state => chartDayData(state)) || [];
    const monthData = useSelector(state => chartMonthData(state)) || [];

    useEffect(()=>{
        // Days
        if(!type && arrayData.days.final.length > 0){
            dispatch(chartsDayAction({
                init: arrayData.days.init[data.days.init],
                final: arrayData.days.final[data.days.final]
            }));
        }
        if(type && arrayData.months.final.length > 0){
            dispatch(chartsMonthAction({
                init: arrayData.months.init[data.months.init],
                final: arrayData.months.final[data.months.final]
            }));
        }
    }, [type, data, arrayData]);

    useEffect(()=>{
        console.log(dayData, monthData)
    }, [dayData, monthData])

    return(
        <SafeAreaView style={{marginHorizontal: 10}}>
            <View style={Style.switchContainer}>
                <Text style={{marginRight: 10}}>Dia</Text>
                <Switch
                    trackColor={{ false: Colors.grey, true: Colors.grey }}
                    thumbColor={Colors.primary}
                    ios_backgroundColor={Colors.white}
                    onValueChange={toggleSwitch}
                    value={type}/>
                <Text style={{marginLeft: 10}}>Mes</Text>
            </View>
            {!type && <View>
                        <Picker
                            selectedValue={data.days.init}
                            onValueChange={(itemValue, itemIndex) => {
                                setArrayData((lastData: any) => ({...lastData, days: {...lastData.days, final: DayArray(DAYS - (itemIndex + 1))}}));
                                setData(lastData => ({...lastData, days: {final: 0, init: itemValue}}));
                            }}>
                            {arrayData.days.init.map((date: any, index: any) => (
                                <Picker.Item key={'days-init-' + index} label={formatDateWithDay(date)} value={index}/>
                            ))}
                        </Picker>
                        <Picker
                            selectedValue={data.days.final}
                            onValueChange={(itemValue, itemIndex) => {
                                setData(lastData => ({...lastData, days: {...lastData.days, final: itemValue}}));
                            }}>
                            {arrayData.days.final.map((date: any, index: any) => (
                                <Picker.Item key={'days-final-' + index} label={formatDateWithDay(date)} value={index}/>
                            ))}
                        </Picker>
                        <VictoryChart
                            theme={VictoryTheme.material}
                            domainPadding={{ x: 10 }}
                            scale={{ x: "time" }}
                            animate={{
                                duration: 1000
                              }}>
                            <VictoryAxis 
                                tickFormat={(t: Date) => t.getDate()}
                                label="Tiempo"
                                style={{tickLabels: {padding: 5}, axisLabel: {padding: 30}}}/>
                            <VictoryAxis 
                                dependentAxis 
                                label="Producción (kVAh)" 
                                style={{tickLabels: {padding: 0}, axisLabel: {padding: 30}}}/>
                            <VictoryBar
                                style={{ data: { fill: Colors.green } }}
                                data={MapData(dayData)}/>
                        </VictoryChart>
                        <Button 
                            title='Descargar reporte' 
                            color={Colors.green}
                            onPress={()=>{downloadFileDay(arrayData.days.init[data.days.init], arrayData.days.final[data.days.final])}}
                            disabled={arrayData.days.final.length === 0}/>
                    </View>}
            {type && <View>
                        <Picker
                            selectedValue={data.months.init}
                            onValueChange={(itemValue, itemIndex) => {
                                setArrayData((lastData: any) => ({...lastData, months: {...lastData.months, final: MonthArray(MONTHS - (itemIndex + 1))}}));
                                setData(lastData => ({...lastData, months: {final: 0, init: itemValue}}));
                            }}>
                            {arrayData.months.init.map((date: any, index: any) => (
                                <Picker.Item key={'months-init-' + index} label={formatMonth(date)} value={index}/>
                            ))}
                        </Picker>
                        <Picker
                            selectedValue={data.months.final}
                            onValueChange={(itemValue, itemIndex) => {
                                setData(lastData => ({...lastData, months: {...lastData.months, final: itemValue}}));
                            }}>
                            {arrayData.months.final.map((date: any, index: any) => (
                                <Picker.Item key={'months-final-' + index} label={formatMonth(date)} value={index}/>
                            ))}
                        </Picker>
                        <VictoryChart
                            theme={VictoryTheme.material}
                            domainPadding={{ x: 10 }}
                            scale={{ x: "time" }}
                            animate={{
                                duration: 1000
                                }}>
                            <VictoryAxis 
                                tickFormat={(t: Date) => t.getMonth() + 1}
                                label="Tiempo"
                                style={{tickLabels: {padding: 5}, axisLabel: {padding: 30}}}/>
                            <VictoryAxis 
                                dependentAxis 
                                label="Producción (kVAh)" 
                                style={{tickLabels: {padding: 0}, axisLabel: {padding: 30}}}/>
                            <VictoryBar
                                style={{ data: { fill: Colors.green } }}
                                data={MapData(monthData)}/>
                        </VictoryChart>
                        <Button 
                            title='Descargar reporte' 
                            color={Colors.green}
                            onPress={()=>{downloadFileMonth(arrayData.months.init[data.months.init], arrayData.months.final[data.months.final])}}
                            disabled={arrayData.months.final.length === 0}/>
                    </View>}
        </SafeAreaView>
    );
};

export default Charts;