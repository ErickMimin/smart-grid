import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, useWindowDimensions, StatusBar, ActivityIndicator, Pressable } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import { dashboardAction } from '../../redux/actions/dashboard';
import {reportAction} from '../../redux/actions/reports';
import { dashboardProductionData, reportsData, isDashboardLoading, isReportsLoading, dashboardData } from '../../redux/selectors/index';

import ReportComponent from './components/ReportComponent';
import RealChart from './components/RealChart';
import ModalData from './components/ModalData';
import CardsComponent from './components/CardsComponent';
import Colors from '../../constants/Colors';
import style from './style';

const Dashboard: React.FC<{navigation:any}> = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
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
    const { production,
            voltage,
            current } = data;
    const productionData: Array<any> = useSelector(state => dashboardProductionData(state)) || [];
    const isLoading = useSelector(state => isDashboardLoading(state) && isReportsLoading(state));
    // Dispatcher Actions
    useEffect(() => {
        dispatch(dashboardAction({data: true}));
        dispatch(reportAction({}));
    }, []);

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
                    <RealChart 
                    data={productionData}
                    candleWidth={60}/>
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
