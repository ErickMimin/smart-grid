import { NOTIFICATIONS_START, NOTIFICATIONS_ERROR, NOTIFICATIONS_COMPLETE} from '../../constants/actionTypes';

const initialState = {};

export default function(state = initialState, action: any){
    switch(action.type){
        case NOTIFICATIONS_START:
            return {...state, isLoading: true}
        case NOTIFICATIONS_ERROR:
            return {...state, isLoading: false, notifications: null}
        case NOTIFICATIONS_COMPLETE:
            return {...state, isLoading: false, notifications: action.results.data}
        default:
            return {...state}
    }
}