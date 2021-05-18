import { takeLatest, call, put } from 'redux-saga/effects';
import { SETTINGS_START, SETTINGS_ERROR, SETTINGS_COMPLETE} from '../../constants/actionTypes';
import { apiCall } from '../api/index';
import { AxiosResponse } from 'axios';

export function* settingsSaga({payload}: any){
    try{
        const results: AxiosResponse<any> = yield call(apiCall, 'settings/range', null, null, 'GET');
        yield put({type: SETTINGS_COMPLETE, results});
    }catch(error){
        yield put({type: SETTINGS_ERROR, error});
    }
}

export default function* reports(){
    yield takeLatest(SETTINGS_START, settingsSaga);
}