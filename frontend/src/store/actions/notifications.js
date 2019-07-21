import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_NOTIFICATIONS, REMOVE_NOTIFICATION } from "../actionTypes";

export const loadNotifications = notifications => ({
    type: LOAD_NOTIFICATIONS,
    notifications
});

export const removeNotification = id => ({
    type: REMOVE_NOTIFICATION,
    id
});

export const fetchNotifications = (user_id, role) => {
    return dispatch => {
        return apiCall("get", `/api/${role}/${user_id}/orders/unassigned`)
            .then(res => {
                dispatch(loadNotifications(res));
            })
            .catch(err => {
                dispatch(addError(err.message));
            });
    };
};
