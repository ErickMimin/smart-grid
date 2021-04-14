import { AxiosResponse } from 'axios';
import {call, put, takeLatest} from 'redux-saga/effects';
import { DASHBOARD_START, DASHBOARD_ERROR, DASHBOARD_COMPLETE } from '../../constants/actionTypes';
import { apiCall } from '../api/index';

export function* dashboardSaga({payload}: any){
    try{
        const results: AxiosResponse<any> = yield call(apiCall, `dashboard${payload.data? `?data=${payload.data}`: ''}`, null, null, 'GET');
        yield put({type: DASHBOARD_COMPLETE, results});
    }catch(error){
        yield put({type: DASHBOARD_ERROR, error});
    }
}

export default function* dashboard(){
    yield takeLatest(DASHBOARD_START, dashboardSaga);
}