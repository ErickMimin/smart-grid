import { SETTINGS_START } from '../../constants/actionTypes';

export const settingsAction = (payload: any) => ({
    type: SETTINGS_START,
    payload
});