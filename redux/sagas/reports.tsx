import { takeLatest, call, put } from 'redux-saga/effects';
import { REPORTS_START, REPORTS_ERROR, REPORTS_COMPLETE} from '../../constants/actionTypes';
import { apiCall } from '../api/index';
import { AxiosResponse } from 'axios';

export function* reportsSaga({payload}: any){
    try{
        const results: AxiosResponse<any> = yield call(apiCall, 'reports', null, null, 'GET');
        yield put({type: REPORTS_COMPLETE, results});
    }catch(error){
        yield put({type: REPORTS_ERROR, error});
    }
}

export default function* reports(){
    yield takeLatest(REPORTS_START, reportsSaga);
}