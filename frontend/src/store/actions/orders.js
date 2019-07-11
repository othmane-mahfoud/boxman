import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_ORDERS, REMOVE_ORDER } from "../actionTypes";

export const loadOrders = orders => ({
  type: LOAD_ORDERS,
  orders
});

export const remove = id => ({
  type: REMOVE_ORDER,
  id
});

export const removeOrder = (user_id, order_id) => {
    return dispatch => {
        return apiCall("delete", `/api/users/${user_id}/orders/${order_id}`)
            .then(() => dispatch(remove(order_id)))
            .catch(err => {
                addError(err.message);
            });
    };
};

export const fetchOrders = () => {
    return dispatch => {
        return apiCall("get", "/api/orders")
            .then(res => {
                dispatch(loadOrders(res));
            })
            .catch(err => {
                dispatch(addError(err.message));
            });
    };
};

export const addNewOrder = orderDetails => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall("post", `/api/users/${id}/orders`, orderDetails)
    .then(res => {})
    .catch(err => addError(err.message));
};
