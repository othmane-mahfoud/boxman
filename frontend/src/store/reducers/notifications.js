import { LOAD_NOTIFICATIONS, REMOVE_NOTIFICATION } from "../actionTypes";

const order = (state = [], action) => {
    switch (action.type) {
        case LOAD_NOTIFICATIONS:
            return [...action.notifications];
        case REMOVE_NOTIFICATION:
            return state.filter(notification => notification._id !== action.id);
        default:
            return state;
    }
};

export default order;
