import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_ORDERS, REMOVE_ORDER, EDIT_ORDER} from "../actionTypes";

export const loadOrders = orders => ({
    type: LOAD_ORDERS,
    orders
});

export const remove = id => ({
    type: REMOVE_ORDER,
    id
});

export const edit = (order_id, order) => ({
    type: EDIT_ORDER,
    order_id,
    order
})

export const removeOrder = (user_id, order_id) => {
    return dispatch => {
        return apiCall("delete", `/api/users/${user_id}/orders/${order_id}`)
            .then(() => dispatch(remove(order_id)))
            .catch(err => {
                addError(err.message);
            });
    };
};

export const editOrder = (user_id, role, order_id, data) => {
    return dispatch => {
        return apiCall("put", `/api/${role}/${user_id}/orders/${order_id}`, data)
            .then(order => {
                dispatch(edit(order_id, order))
            })
            .catch(err => {
                addError(err.message);
            });
    };
};

export const fetchOrders = (user_id, role) => {
    return dispatch => {
        return apiCall("get", `/api/${role}/${user_id}/orders`)
            .then(res => {
                dispatch(loadOrders(res));
            })
            .catch(err => {
                dispatch(addError(err.message));
            });
    };
};

export const fetchNotifications = (user_id, role) => {
    return apiCall("get", `/api/${role}/${user_id}/orders/unassigned`)
}

export const addOrder = orderDetails => (dispatch, getState) => {
    let { currentUser } = getState();
    const id = currentUser.user._id;
    return apiCall("post", `/api/customer/${id}/orders`, orderDetails)
      .then(res => {})
      .catch(err => addError(err.message));
};

export const acceptOrder = (user_id, role, order_id) => {
    return dispatch => {
        return apiCall("put", `/api/${role}/${user_id}/orders/${order_id}/accept`)
            .then(order => {
                dispatch(edit(order_id, order))
            })
            .catch(err => {
                addError(err.message);
            });
    };
};

export const deliverOrder = (user_id, role, order_id) => {
    return dispatch => {
        return apiCall("put", `/api/${role}/${user_id}/orders/${order_id}/deliver`)
            .then(order => {
                dispatch(edit(order_id, order))
            })
            .catch(err => {
                addError(err.message);
            });
    };
};