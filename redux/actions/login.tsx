import { LOGIN_START } from '../../constants/actionTypes';

export const loginAction = (payload: any) => ({
    type: LOGIN_START,
    payload
});