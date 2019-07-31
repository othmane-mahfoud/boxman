import { combineReducers } from 'redux'
import currentUser from './currentUser'
import errors from './errors'
import orders from './orders'
import notifications from './notifications'

const rootReducer = combineReducers({ 
    currentUser,
    errors,
    orders,
    notifications
})

export default rootReducer