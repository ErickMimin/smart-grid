import { takeLatest, call, put } from 'redux-saga/effects';
import { CHART_DAY_START, CHART_DAY_ERROR, CHART_DAY_COMPLETE} from '../../constants/actionTypes';
import { apiCall } from '../api/index';
import { AxiosResponse } from 'axios';
import Charts from '../../components/Charts/Charts';

export function* chartDaySaga({payload}: any){
    try{
        const results: AxiosResponse<any> = yield call(apiCall, `charts/days/${payload.init.toISOString()}/${payload.final.toISOString()}`, null, null, 'GET');
        yield put({type: CHART_DAY_COMPLETE, results});
    }catch(error){
        yield put({type: CHART_DAY_ERROR, error});
    }
}

export default function* chartDay(){
    yield takeLatest(CHART_DAY_START, chartDaySaga);
}