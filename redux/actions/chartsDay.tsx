import { CHART_DAY_START } from '../../constants/actionTypes';

export const chartsDayAction = (payload: any) => ({
    type: CHART_DAY_START,
    payload
});