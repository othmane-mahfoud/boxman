import { combineReducers } from 'redux'
import currentUser from './currentUser'
import errors from './errors'
import orders from './orders'

const rootReducer = combineReducers({ 
    currentUser,
    errors,
    orders
})

export default rootReducer