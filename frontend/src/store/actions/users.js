import { apiCall } from "../../services/api";
import { SET_CURRENT_USER, EDIT_USER } from "../actionTypes";
import { addError, removeError } from "./errors";

export function edit(user) {
    return {
      type: SET_CURRENT_USER,
      user
    };
}

export function editProfile(userId, role, userData) {
    return dispatch => {
    // wrap our thunk in a promise so we can wait for the API call
        return new Promise((resolve, reject) => {
            return apiCall("put", `/api/${role}/${userId}/profile`, userData)
            .then(user => {
                dispatch(edit(user));
                dispatch(removeError());
                resolve(); // indicate that the API call succeeded
            })
            .catch(err => {
                dispatch(addError(err.message));
                reject(); // indicate the API call failed
            });
        });
    };
}

export function getProfile(userId, role) {
    return apiCall("get", `/api/${role}/${userId}/profile`)
    .then(user => {
        return user
    })
    .catch(err => {
        return err
    })

}