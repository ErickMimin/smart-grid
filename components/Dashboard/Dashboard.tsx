import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, useWindowDimensions, StatusBar, ActivityIndicator, PanResponder } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import style from './style';

import { dashboardAction } from '../../redux/actions/dashboard';
import {reportAction} from '../../redux/actions/reports';
import { dashboardProductionData, reportsData, dashboardVoltage, dashboardCurrent, dashboardProduction, isDashboardLoading, isReportsLoading } from '../../redux/selectors/index';

import ReportComponent from './components/ReportComponent';
import RealChart from './components/RealChart';
import CardsComponent from './components/CardsComponent';
import Colors from '../../constants/Colors';
import Swipe from '../../constants/Swipe';

const Dashboard: React.FC<{navigation:any}> = ({navigation}) => {
    const window = useWindowDimensions();
    // Gestures
    const panResponder = Swipe({
        swipeLeft: null,
        swipeRight: () => {
            navigation.navigate('Charts');
        }
    });
    // Style constants
    const [heightReports, setHeightReports] = useState(0);
    const findHeightReports = (layout: any) => {
        const {height} = layout;
        setHeightReports(window.height - height - (StatusBar.currentHeight || 0));
    };
    // API Data
    const dispatch = useDispatch();
    const productionData: Array<any> = useSelector(state => dashboardProductionData(state)) || [];
    const reports = useSelector(state => reportsData(state)) || [];
    const voltage = useSelector(state => dashboardVoltage(state)); 
    const current = useSelector(state => dashboardCurrent(state));
    const production = useSelector(state => dashboardProduction(state)); 
    const isLoading = useSelector(state => isDashboardLoading(state) && isReportsLoading(state))
    // Dispatcher Actions
    useEffect(() => {
        dispatch(dashboardAction({data: true}));
        dispatch(reportAction({}));
    }, []);

    if(isLoading)
        return (<View
                style={style.container}>
                    <ActivityIndicator size="large" color={Colors.primary}/>
                </View>);
    else
        return(
            <View {...panResponder.panHandlers}>
                <View 
                onLayout={(event) => {findHeightReports(event.nativeEvent.layout)}}>
                    <RealChart 
                    data={productionData}
                    candleWidth={60}/>
                    <CardsComponent
                    voltage={voltage}
                    current={current}
                    production={production}/>
                    <View>
                        <Text
                        style={style.reportsTitle}>
                            {'Reportes historicos'}
                        </Text>
                    </View>
                </View>
                <SafeAreaView style={{height: heightReports}}>
                    <FlatList
                        data={reports}
                        renderItem={ReportComponent}
                        keyExtractor={(item) => item.reportID}
                    />
                </SafeAreaView>
            </View>
        );
};

export default Dashboard;
