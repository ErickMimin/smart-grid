import { AxiosResponse } from 'axios';
import { apiCall } from '../api/index';
import {call, put, takeLatest} from 'redux-saga/effects';
import { LOGIN_START, LOGIN_ERROR, LOGIN_COMPLETE } from '../../constants/actionTypes';




export function* loginSaga({payload}: any){
    try{
        const results: AxiosResponse<any> = yield call(apiCall, `login`, payload, null, 'POST');
        yield put({type: LOGIN_COMPLETE, results, header: payload.password});
    }catch(error){
        yield put({type: LOGIN_ERROR, error});
    }
}

export default function* login(){
    yield takeLatest(LOGIN_START, loginSaga);
}