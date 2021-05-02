import { NOTIFICATIONS_START } from '../../constants/actionTypes';

export const notificationsAction = (payload: any) => ({
    type: NOTIFICATIONS_START,
    payload
});