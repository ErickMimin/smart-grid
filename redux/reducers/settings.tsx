import { SETTINGS_START, SETTINGS_ERROR, SETTINGS_COMPLETE} from '../../constants/actionTypes';

const initialState = {};

export default function(state = initialState, action: any){
    switch(action.type){
        case SETTINGS_START:
            return {...state, isLoading: true}
        case SETTINGS_ERROR:
            return {...state, isLoading: false, settings: null}
        case SETTINGS_COMPLETE:
            return {...state, isLoading: false, settings: action.results.data}
        default:
            return {...state}
    }
}