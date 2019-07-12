import React from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Homepage from '../components/Homepage'
import Profile from '../components/Profile'
import OrderForm from './OrderForm'
import { authUser } from '../store/actions/auth'
import { removeError } from '../store/actions/errors'
import { editUser } from '../store/actions/users'
import withAuth from '../hocs/withAuth'

const Main = props => {
    const { editUser, currentUser } = props
    return (
        <Switch>
            <Route exact path='/' render={(props) => <Homepage currentUser={currentUser} {...props}/>}/>
            <Route exact path='/profile' render={(props) => <Profile editUser={editUser} currentUser={currentUser} {...props}/>}/>
            {/* <Route exact path='/orders' render={(props) => <OrdersTimeline currentUser={currentUser} {...props}/>}/> */}
            <Route exact path='/users/:id/orders/new' component={withAuth(OrderForm)} />
        </Switch>
    ) 
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        errors: state.errors
    }
}

export default withRouter(connect(mapStateToProps, {authUser, removeError, editUser})(Main))