import { REPORTS_START, REPORTS_ERROR, REPORTS_COMPLETE} from '../../constants/actionTypes';

const initialState = {};

export default function(state = initialState, action: any){
    switch(action.type){
        case REPORTS_START:
            return {...state, isLoading: true}
        case REPORTS_ERROR:
            return {...state, isLoading: false, reports: null}
        case REPORTS_COMPLETE:
            return {...state, isLoading: false, reports: action.results.data}
        default:
            return {...state}
    }
}