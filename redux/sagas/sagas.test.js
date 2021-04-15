import { REPORTS_COMPLETE, DASHBOARD_COMPLETE } from '../../constants/actionTypes';
import {reportsSaga} from './reports';
import {dashboardSaga} from './dashboard'

test('Una vez llamada la saga del servicio reportes, retorna los datos de los reportes', () => {
    const reports = reportsSaga({})
    reports.next()
    expect(reports.next().value.payload.action.type).toBe(REPORTS_COMPLETE)
});


test('Una vez llamada la saga del servicio dashboard completo, retorna todos los datos del dashboard', () => {
    const dashboard = dashboardSaga({payload: true})
    dashboard.next()
    expect(dashboard.next().value.payload.action.type).toBe(DASHBOARD_COMPLETE)
    
});

test('Una vez llamada la saga del servicio dashboard, retorna los datos del dashboard', () => {
    const dashboard = dashboardSaga({payload: false})
    dashboard.next()
    expect(dashboard.next().value.payload.action.type).toBe(DASHBOARD_COMPLETE)
    
});