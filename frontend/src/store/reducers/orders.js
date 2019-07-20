import { LOAD_ORDERS, REMOVE_ORDER, EDIT_ORDER } from "../actionTypes";

const order = (state = [], action) => {
    switch (action.type) {
        case LOAD_ORDERS:
            return [...action.orders];
        case REMOVE_ORDER:
            return state.filter(order => order._id !== action.id);
        case EDIT_ORDER:
            const newState = state.map(order => 
                order._id === action.order_id
                ? action.order
                : order
            )
            return newState;
        default:
            return state;
    }
};

export default order;
