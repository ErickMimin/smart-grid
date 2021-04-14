import {combineReducers} from 'redux';
import dashboard from './dashboard';
import reports from './reports';

const rootReducer = combineReducers({
    dashboard,
    reports
});

export default rootReducer;