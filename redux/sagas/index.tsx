import {all} from 'redux-saga/effects';
import dashboard from './dashboard';
import reports from './reports';
import notifications from './notifications';
import login from './login';
import chartDay from './chartsDay';
import chartMonth from './chartsMonth';
import settings from './settings'

export default function* rootSaga(){
    yield all([
        dashboard(),
        reports(),
        notifications(),
        login(),
        chartDay(),
        chartMonth(),
        settings(),
    ]);
}