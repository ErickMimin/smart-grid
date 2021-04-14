import { REPORTS_START } from '../../constants/actionTypes';

export const reportAction = (payload: any) => ({
    type: REPORTS_START,
    payload
});