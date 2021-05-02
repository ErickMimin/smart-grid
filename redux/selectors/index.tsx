import {get} from 'lodash';

export const isReportsLoading = (state: any) => get(state, 'reports.isLoading');
export const reportsData = (state: any) => get(state, 'reports.reports');

export const isDashboardLoading = (state: any) => get(state, 'dashboard.isLoading');
export const dashboardData = (state: any) => get(state, 'dashboard.dashboard');
export const dashboardProduction = (state: any) => get(state, 'dashboard.dashboard.production');
export const dashboardProductionData = (state: any) => get(state, 'dashboard.dashboard.productionData');

export const dashboardDataVoltage = (state: any) => get(state, 'dashboard.dashboardData.voltage');
export const dashboardDataCurrent = (state: any) => get(state, 'dashboard.dashboardData.current');
export const dashboardDataProduction = (state: any) => get(state, 'dashboard.dashboardData.production');

export const isNotificationsLoading = (state: any) => get(state, 'notifications.isLoading');
export const notificationsData = (state: any) => get(state, 'notifications.notifications');