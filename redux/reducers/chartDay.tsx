import { CHART_DAY_START, CHART_DAY_ERROR, CHART_DAY_COMPLETE} from '../../constants/actionTypes';

const initialState = {};

export default function(state = initialState, action: any){
    switch(action.type){
        case CHART_DAY_START:
            return {...state, isLoading: true}
        case CHART_DAY_ERROR:
            return {...state, isLoading: false, chartDay: null}
        case CHART_DAY_COMPLETE:
            return {...state, isLoading: false, chartDay: action.results.data}
        default:
            return {...state}
    }
}