import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, useWindowDimensions, StatusBar } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import style from './style';

import { dashboardAction } from '../../redux/actions/dashboard';
import {reportAction} from '../../redux/actions/reports';
import { dashboardProductionData, reportsData, dashboardVoltage, dashboardCurrent, dashboardProduction } from '../../redux/selectors/index';
import ReportComponent from './ReportComponent';
import RealChart from './RealChart';
import CardsComponent from './CardsComponent';

const Dashboard: React.FC<{}> = () => {
    // Style constants
    const window = useWindowDimensions();
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
    // Dispatcher Actions
    useEffect(() => {
        dispatch(dashboardAction({data: true}));
        dispatch(reportAction({}));
    }, []);

    useEffect(() => {
    }, [productionData])

    return(
        <View>
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
