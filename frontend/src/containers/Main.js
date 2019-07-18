import React from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import LandingPage from '../components/LandingPage'
import Profile from '../components/Profile'
import Map from '../components/Map'
import OrderAssistance from '../components/OrderAssistance'
import OrderForm from './OrderForm'
import { authUser } from '../store/actions/auth'
import { removeError } from '../store/actions/errors'
import { editUser } from '../store/actions/users'
import withAuth from '../hocs/withAuth'

const Main = props => {
    const { editUser, currentUser } = props
    return (
        <Switch>
            <Route exact path='/' render={(props) => <LandingPage editUser={editUser} currentUser={currentUser} {...props}/>}/>
            <Route exact path='/profile' render={(props) => <Profile editUser={editUser} currentUser={currentUser} {...props}/>}/>
            {/* <Route exact path='/orders' render={(props) => <OrdersTimeline currentUser={currentUser} {...props}/>}/> */}
            <Route exact path='/users/:id/orders/new' component={withAuth(OrderForm)} />
            <Route exact path='/map' component={Map} />
            <Route exact path='/:id/assistance' render={(props) => <OrderAssistance currentUser={currentUser} {...props}/>} />
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