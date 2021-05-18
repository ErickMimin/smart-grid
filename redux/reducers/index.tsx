import {combineReducers} from 'redux';
import dashboard from './dashboard';
import reports from './reports';
import notifications from './notifications';
import login from './login';
import chartDay from './chartDay';
import chartMonth from './chartMonth';
import settings from './settings';

const rootReducer = combineReducers({
    dashboard,
    reports,
    notifications,
    login,
    chartDay,
    chartMonth,
    settings
});

export default rootReducer;