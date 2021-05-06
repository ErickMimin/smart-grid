import { LOGIN_START, LOGIN_ERROR, LOGIN_COMPLETE } from '../../constants/actionTypes';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const setHeader = async (header: any) =>{
    try {
        await AsyncStorage.setItem('header', header)
      } catch(error) {
        Alert.alert("No se pudo guardar el header");
      }
}

const initialState = {};

export default function(state: any = initialState, action: any){
    switch(action.type){
        case LOGIN_START:
            return {...state, isLoading: true}
        case LOGIN_ERROR:
            return {...state, isLoading: false, login: null}
        case LOGIN_COMPLETE:
            setHeader(action.header);
            return {...state, isLoading: false, isLogin: action.results.status === 200 ? true : false};
        default:
            return {...state}
    }
}