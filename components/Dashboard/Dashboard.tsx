import React, { useEffect, useState, useRef } from 'react';
import { View, Text, SafeAreaView, FlatList, useWindowDimensions, StatusBar, ActivityIndicator, Pressable, Switch } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import { dashboardAction } from '../../redux/actions/dashboard';
import {reportAction} from '../../redux/actions/reports';
import { dashboardProductionData, reportsData, isDashboardLoading, isReportsLoading, dashboardData, dashboardDataCurrent, dashboardDataVoltage, dashboardDataProduction } from '../../redux/selectors/index';

import ReportComponent from './components/ReportComponent';
import RealChart from './components/RealChart';
import ModalData from './components/ModalData';
import CardsComponent from './components/CardsComponent';
import Colors from '../../constants/Colors';
import style from './style';

const REFRESH = 60000;

const Dashboard: React.FC<{navigation:any}> = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [type, setType] = useState<'candle' | 'lineal'>('candle');
    const interval = useRef<any>(null);
    const window = useWindowDimensions();
    // Style constants
    const [heightReports, setHeightReports] = useState(0);
    const findHeightReports = (layout: any) => {
        const {height} = layout;
        setHeightReports(window.height - height - (StatusBar.currentHeight || 0));
    };
    // API Data
    const dispatch = useDispatch();
    const reports = useSelector(state => reportsData(state)) || [];
    const data = useSelector(state => dashboardData(state)) || {
                aparentPower: null, 
                activePower: null,
                frequency: null,
                quadrant: null,
                production: null,
                voltage: null,
                current: null
            };
    const production = useSelector(state => dashboardDataProduction(state)) || 0; 
    const voltage = useSelector(state => dashboardDataVoltage(state)) || 0;
    const current = useSelector(state => dashboardDataCurrent(state)) || 0;
    const productionData: Array<any> = useSelector(state => dashboardProductionData(state)) || [];
    const isLoading = useSelector(state => isDashboardLoading(state) && isReportsLoading(state));

    const toggleType = () => setType((state) => {
        if(state === 'candle') return 'lineal';
        return 'candle';
    });

    // Dispatcher Actions
    useEffect(() => {
        dispatch(dashboardAction({data: type}));
        dispatch(reportAction({}));
        interval.current = setInterval(() => {
            dispatch(dashboardAction({data: type}));
        }, REFRESH);
    }, []);

    useEffect(() => {
        dispatch(dashboardAction({data: type}));
        clearInterval(interval.current);
        interval.current = setInterval(() => {
            dispatch(dashboardAction({data: type}));
        }, REFRESH);
    }, [type]);

    if(isLoading)
        return (
            <View
                style={style.container}>
                <ActivityIndicator size="large" color={Colors.primary}/>
            </View>
        );
    else
        return(
            <View>
                <ModalData 
                visible={modalVisible}
                data={data}
                onPress={()=>{setModalVisible(false)}}/>
                <View 
                onLayout={(event) => {findHeightReports(event.nativeEvent.layout)}}>
                    <View style={style.switchContainer}>
                        <Text style={{marginRight: 10}}>Velas</Text>
                        <Switch
                            trackColor={{ false: Colors.grey, true: Colors.grey }}
                            thumbColor={Colors.primary}
                            ios_backgroundColor={Colors.white}
                            onValueChange={toggleType}
                            value={type !== 'candle'}/>
                        <Text style={{marginLeft: 10}}>Lineal</Text>
                    </View>
                    <RealChart 
                    data={productionData.map((elem) => {return {...elem, x: new Date(elem.x)}})}
                    type={type}/>
                    <CardsComponent
                    voltage={voltage}
                    current={current}
                    production={production}/>
                    <Pressable
                    onPress={() => setModalVisible(true)}>
                        <Text
                        style={style.button}>
                            Mostrar más
                        </Text>
                    </Pressable>
                </View>
                <SafeAreaView style={{height: heightReports}}>
                    <FlatList
                        data={reports}
                        renderItem={({item})=><ReportComponent item={item} dispatch={dispatch} />}
                        keyExtractor={(item, index) => `${item.reportId + index}`}/>
                </SafeAreaView>
            </View>
        );
};

export default Dashboard;
