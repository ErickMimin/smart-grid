import {combineReducers} from 'redux';
import dashboard from './dashboard';
import reports from './reports';
import notifications from './notifications';

const rootReducer = combineReducers({
    dashboard,
    reports,
    notifications
});

export default rootReducer;