import {all} from 'redux-saga/effects';
import dashboard from './dashboard';
import reports from './reports';

export default function* rootSaga(){
    yield all([
        dashboard(),
        reports()
    ]);
}