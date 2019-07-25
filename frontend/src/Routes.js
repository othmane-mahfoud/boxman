import React from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import LandingPage from './views/LandingPage'
import Profile from './components/Profile'
import Map from './components/Map'
import OrderAssistance from './components/OrderAssistance'
import OrderForm from './containers/OrderForm'
import TrackOrder from './components/TrackOrder'
import { authUser } from './store/actions/auth'
import { removeError } from './store/actions/errors'
import { editProfile } from './store/actions/users'
import withAuth from './hocs/withAuth'

const Main = props => {
    const { currentUser, editProfile } = props
    return (
        <Switch>
            <Route exact path='/' render={(props) => 
                <LandingPage 
                    currentUser={currentUser} 
                    editProfile={editProfile} 
                    {...props}
                />}
            />
            <Route exact path='/profile' render={(props) => <Profile currentUser={currentUser} {...props}/>}/>
            <Route exact path='/users/:id/orders/new' component={withAuth(OrderForm)} />
            <Route exact path='/map' component={Map} />
            <Route exact path='/customer/trackorder/:order_id' render={(props) => <TrackOrder currentUser={currentUser} {...props}/>}/>
            <Route exact path='/boxman/:id/assistance' component={withAuth(OrderAssistance)} />
        </Switch>
    ) 
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        errors: state.errors
    }
}

export default withRouter(connect(mapStateToProps, {authUser, removeError, editProfile})(Main))