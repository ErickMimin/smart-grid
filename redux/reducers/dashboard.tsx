import { DASHBOARD_START, DASHBOARD_ERROR, DASHBOARD_COMPLETE } from '../../constants/actionTypes';

const initialState = {};

export default function(state: any = initialState, action: any){
    switch(action.type){
        case DASHBOARD_START:
            return {...state, isLoading: true}
        case DASHBOARD_ERROR:
            return {...state, isLoading: false, dashboard: null}
        case DASHBOARD_COMPLETE:
            const newState = {...state, isLoading: false}
            if(action.results.data.hasOwnProperty('productionData'))
                newState['dashboard'] = action.results.data;
            else{
                newState['dashboard']['voltage'] = action.results.data.voltage;
                newState['dashboard']['current'] = action.results.data.current;
                newState['dashboard']['production'] = action.results.data.production;
            }
            return newState;
        default:
            return {...state}
    }
}