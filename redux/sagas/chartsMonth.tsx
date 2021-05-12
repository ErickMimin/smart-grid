import { takeLatest, call, put } from 'redux-saga/effects';
import { CHART_MONTH_START, CHART_MONTH_ERROR, CHART_MONTH_COMPLETE} from '../../constants/actionTypes';
import { apiCall } from '../api/index';
import { AxiosResponse } from 'axios';

export function* chartMonthSaga({payload}: any){
    try{
        const results: AxiosResponse<any> = yield call(apiCall, `charts/months/${payload.init.toISOString()}/${payload.final.toISOString()}`, null, null, 'GET');
        yield put({type: CHART_MONTH_COMPLETE, results});
    }catch(error){
        yield put({type: CHART_MONTH_ERROR, error});
    }
}

export default function* chartMonth(){
    yield takeLatest(CHART_MONTH_START, chartMonthSaga);
}