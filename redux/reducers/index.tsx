import {combineReducers} from 'redux';
import dashboard from './dashboard';
import reports from './reports';
import notifications from './notifications';
import login from './login';

const rootReducer = combineReducers({
    dashboard,
    reports,
    notifications,
    login
});

export default rootReducer;