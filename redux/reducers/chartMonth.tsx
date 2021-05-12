import { CHART_MONTH_START, CHART_MONTH_ERROR, CHART_MONTH_COMPLETE} from '../../constants/actionTypes';

const initialState = {};

export default function(state = initialState, action: any){
    switch(action.type){
        case CHART_MONTH_START:
            return {...state, isLoading: true}
        case CHART_MONTH_ERROR:
            return {...state, isLoading: false, chartMonth: null}
        case CHART_MONTH_COMPLETE:
            return {...state, isLoading: false, chartMonth: action.results.data}
        default:
            return {...state}
    }
}