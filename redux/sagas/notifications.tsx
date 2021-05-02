import { takeLatest, call, put } from 'redux-saga/effects';
import { NOTIFICATIONS_START, NOTIFICATIONS_ERROR, NOTIFICATIONS_COMPLETE} from '../../constants/actionTypes';
import { apiCall } from '../api/index';
import { AxiosResponse } from 'axios';

export function* notificationsSaga({payload}: any){
    try{
        const results: AxiosResponse<any> = yield call(apiCall, 'notifications', null, null, 'GET');
        yield put({type: NOTIFICATIONS_COMPLETE, results});
    }catch(error){
        yield put({type: NOTIFICATIONS_ERROR, error});
    }
}

export default function* reports(){
    yield takeLatest(NOTIFICATIONS_START, notificationsSaga);
}