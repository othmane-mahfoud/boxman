import { LOAD_ORDERS, REMOVE_ORDER } from "../actionTypes";

const order = (state = [], action) => {
    switch (action.type) {
        case LOAD_ORDERS:
            return [...action.orders];
        case REMOVE_ORDER:
            return state.filter(order => order._id !== action.id);
        default:
            return state;
    }
};

export default order;
