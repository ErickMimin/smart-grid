import {get} from 'lodash';

export const isReportsLoading = (state: any) => get(state, 'reports.isLoading');
export const reportsData = (state: any) => get(state, 'reports.reports');

export const isDashboardLoading = (state: any) => get(state, 'dashboard.isLoading');
export const dashboardData = (state: any) => get(state, 'dashboard.dashboard');
export const dashboardProduction = (state: any) => get(state, 'dashboard.dashboard.production');
export const dashboardProductionData = (state: any) => get(state, 'dashboard.dashboard.productionData');

export const dashboardDataVoltage = (state: any) => get(state, 'dashboard.dashboard.voltage');
export const dashboardDataCurrent = (state: any) => get(state, 'dashboard.dashboard.current');
export const dashboardDataProduction = (state: any) => get(state, 'dashboard.dashboard.production');

export const isNotificationsLoading = (state: any) => get(state, 'notifications.isLoading');
export const notificationsData = (state: any) => get(state, 'notifications.notifications');

export const loginHeader = (state: any) => get(state, 'login.header');
export const loginResponse = (state: any) => get(state, 'login.isLogin');

export const isChartDayLoading = (state: any) => get(state, 'chartDay.isLoading');
export const chartDayData = (state: any) => get(state, 'chartDay.chartDay');

export const isChartMonthLoading = (state: any) => get(state, 'chartMonth.isLoading');
export const chartMonthData = (state: any) => get(state, 'chartMonth.chartMonth');

export const isSettingssLoading = (state: any) => get(state, 'settings.isLoading');
export const settingsData = (state: any) => get(state, 'settings.settings');
