import React from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Homepage from '../components/Homepage'
import OrdersTimeline from '../components/OrdersTimeline'
import Profile from '../components/Profile'
import { authUser } from '../store/actions/auth'
import { removeError } from '../store/actions/errors'
import { editUser } from '../store/actions/users'
import withAuth from '../hocs/withAuth'

const Main = props => {
    const { editUser, authUser, errors, removeError, currentUser } = props
    return (
        <Switch>
            <Route exact path='/' render={(props) => <Homepage currentUser={currentUser} {...props}/>}/>
            <Route exact path='/profile' render={(props) => <Profile editUser={editUser} currentUser={currentUser} {...props}/>}/>
            <Route exact path='/orders' render={(props) => <OrdersTimeline currentUser={currentUser} {...props}/>}/>
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