import {all} from 'redux-saga/effects';
import dashboard from './dashboard';
import reports from './reports';
import notifications from './notifications';

export default function* rootSaga(){
    yield all([
        dashboard(),
        reports(),
        notifications()
    ]);
}