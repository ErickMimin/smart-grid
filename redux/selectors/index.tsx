import {get} from 'lodash';

export const isReportsLoading = (state: any) => get(state, 'reports.isLoading');
export const reportsData = (state: any) => get(state, 'reports.reports');

export const isDashboardLoading = (state: any) => get(state, 'dashboard.isLoading');
export const dashboardVoltage = (state: any) => get(state, 'dashboard.dashboard.voltage');
export const dashboardCurrent = (state: any) => get(state, 'dashboard.dashboard.current');
export const dashboardProduction = (state: any) => get(state, 'dashboard.dashboard.production');
export const dashboardProductionData = (state: any) => get(state, 'dashboard.dashboard.productionData');


export const dashboardDataVoltage = (state: any) => get(state, 'dashboard.dashboardData.voltage');
export const dashboardDataCurrent = (state: any) => get(state, 'dashboard.dashboardData.current');
export const dashboardDataProduction = (state: any) => get(state, 'dashboard.dashboardData.production');