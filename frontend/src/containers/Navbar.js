import React, { Component } from 'react'
import axios from 'axios'
import Switch from "react-switch";
import jwtDecode from 'jwt-decode'
import { socket } from '../services/socket'
import { getLocation } from '../services/location'
import { NavLink } from 'react-router-dom'
import '../styles/Navbar.css'
import { Container, Dropdown, Label, Icon, Menu, Modal, Tab } from 'semantic-ui-react'
import Authform from '../components/Authform'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { authUser, logout } from '../store/actions/auth'
import { editProfile } from '../store/actions/users'
import { loadOrders, fetchOrders, editOrder, acceptOrder } from '../store/actions/orders'
import { fetchNotifications } from '../store/actions/notifications'
import { removeError } from '../store/actions/errors'
import UserImg from '../images/user.png'

var interval
var interval2

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: true,
            name: 'navbar', 
            notifications: []
        }
    }

    componentWillMount() {
        if(this.props.currentUser.user.role === 'boxman'){
            if(localStorage.jwtToken) {
                interval = setInterval(async () => {
                    socket.emit("updateBoxmanLocation", {
                        id: jwtDecode(localStorage.jwtToken)._id,
                        location: await getLocation()
                    });
                }, 5000);
            }
        }
        if(this.props.currentUser.user.role === 'boxman'){
            axios.get(`/api/boxman/${this.props.currentUser.user._id}/profile`)
            .then(res => {
                this.setState({
                    active: res.data.active,
                })
            })
        }
        if(this.props.currentUser.user.role === 'boxman' && this.state.active === true){
            interval2 = setInterval(() => {
                this.props.fetchNotifications(this.props.currentUser.user._id, this.props.currentUser.user.role)
                .then(() => {
                    this.setState({
                        notifications: this.props.notifications
                    })
                })
            }, 5000)
        }
    }

    handleSwitch = () => {
        this.props.editProfile(this.props.currentUser.user._id, this.props.currentUser.user.role, {active: !this.state.active})
        .then(res => {
            this.setState((prevState) => ({
                active: !prevState.active
            }))
        })
        .catch(err => {
            console.log(err)
        })
    }

    acceptOrder = (user_id, role, order_id) => {
        // this.props.editOrder(user_id, role, order_id, { boxman: this.props.currentUser.user._id, status: 'assigned' })
        // .then(res => {
        //     // this.props.history.push('/')
        //     // console.log(res)
        //     this.props.fetchOrders(user_id, role)
        // })
        // .catch(err => {
        //     console.log(err)
        // })
        this.props.acceptOrder(user_id, role, order_id)
        .then(res => {
            this.props.fetchOrders(user_id, role)
        })
        .catch(err => {
            console.log(err)
        })
    }

    logout = e => {
        e.preventDefault()
        clearInterval(interval)
        clearInterval(interval2)
        this.props.logout()
        this.props.history.push('/')
    }

    render() {
        const registerPanes = [
            {
                menuItem: { key: 'customer', icon: 'users', content: 'Customer' },
                render: () => (
                    <Tab.Pane>
                        <Authform 
                            register
                            customer
                            onAuth={authUser}
                            errors={errors}
                            removeError={removeError}
                            buttonText='REGISTER'
                            heading='Register as Customer'
                            {...this.props}
                        /> 
                    </Tab.Pane>
                )
            },
            {
                menuItem: { key: 'boxman', icon: 'box', content: 'Boxman' },
                render: () => (
                    <Tab.Pane>
                        <Authform 
                            register
                            boxman
                            onAuth={authUser}
                            errors={errors}
                            removeError={removeError}
                            buttonText='REGISTER'
                            heading='Register as Boxman'
                            {...this.props}
                        /> 
                    </Tab.Pane>
                )
            },
        ]
        const loginPanes = [
            {
                menuItem: { key: 'customer', icon: 'users', content: 'Customer' },
                render: () => (
                    <Tab.Pane>
                        <Authform
                            login
                            customer
                            onAuth={authUser}
                            errors={errors}
                            removeError={removeError}
                            buttonText='LOGIN'
                            heading='Login as Customer'
                            {...this.props}
                        /> 
                    </Tab.Pane>
                )
            },
            {
                menuItem: { key: 'boxman', icon: 'box', content: 'Boxman' },
                render: () => (
                    <Tab.Pane>
                        <Authform
                            login
                            boxman
                            onAuth={authUser}
                            errors={errors}
                            removeError={removeError}
                            buttonText='LOGIN'
                            heading='Login as Boxman'
                            {...this.props}
                        /> 
                    </Tab.Pane>
                )
            },
        ]
        const { authUser, errors, removeError, currentUser, notifications } = this.props
        const options = notifications.map((n,i) => (
            <div className='notification row p-2' key={i}>
                <div className='col-sm-9'>
                    <span className='mb-1 mt-2 pl-2'><strong>from: </strong>{n.from}</span><br/>
                    <span className='pl-2'><strong>to: </strong>{n.to}</span>
                </div> 
                <div className='col-sm-3'>
                    <button className='btn notification-btn' onClick={this.acceptOrder.bind(this,currentUser.user._id, currentUser.user.role, n._id)}>Accept</button>
                </div> 
            </div>
        ))
        if(!currentUser.isAuthenticated){
            return(
                <div className='Navbar container pt-4'>
                    <Menu secondary>
                        <div className='Navbar-brand'>Boxman <i className="fa fa-shopping-bag"></i></div>
                        <Menu.Menu position='right'>
                            <Modal className='Navbar-modal' trigger={
                                <button className='Navbar-register btn mr-2'>REGISTER</button>}>
                                <Modal.Content>
                                    <Tab className='tab' panes={registerPanes} />
                                </Modal.Content>
                            </Modal>
                            <Modal className='Navbar-modal' trigger={
                                <button className='Navbar-login btn mr-2'>LOGIN</button>}>
                                <Modal.Content>
                                    <Tab panes={loginPanes} />
                                </Modal.Content>
                            </Modal>
                        </Menu.Menu>
                    </Menu>
                </div>
            )
        }
        else {
            return (
                <div className='Navbar-logged pt-4'>
                    <Container>
                        <Menu secondary>
                            <NavLink className='brand-link' to='/'><div className='Navbar-brand-logged'>Boxman <i className="Navbar-brand-logo-logged fa fa-shopping-bag" /></div></NavLink>
                            <Menu.Menu position='right' className='pt-2'>
                                {currentUser.user.role === 'boxman' && this.state.active === true && 
                                    <Menu.Item>
                                        <span className='active-boxman-label'>Active</span>
                                    </Menu.Item>
                                }
                                {currentUser.user.role === 'boxman' && this.state.active === false && 
                                    <Menu.Item>
                                        <span className='active-boxman-label'>Inactive</span>
                                    </Menu.Item>
                                }
                                {currentUser.user.role === 'boxman' && 
                                    <Menu.Item>
                                        <Switch onChange={this.handleSwitch} checked={this.state.active} />
                                    </Menu.Item>
                                }
                                {this.state.notifications.length === 0
                                    ?
                                    <Menu.Item>
                                        {this.state.active === true && <Icon className='Navbar-no-notification-logged' name='bell outline' />}
                                        {!this.state.active && (
                                            <Icon name='bell slash outline'/>
                                        )} 
                                    </Menu.Item>
                                    :
                                    <Menu.Item>
                                        {this.state.active && (
                                            <Dropdown
                                                trigger={
                                                    <Icon className='Navbar-notification-logged' name='bell' />
                                                } 
                                                options={options} 
                                                pointing='top left' 
                                                icon={null} 
                                            />
                                        )}
                                        {this.state.active && (
                                            <Label circular color='green' floating>
                                                { notifications.length }
                                            </Label>
                                        )}
                                        {!this.state.active && (
                                            <Icon name='bell slash outline'/>
                                        )}                              
                                    </Menu.Item>
                                }
                                
                                <Menu.Item>
                                    <img className='Navbar-avatar-logged' src={UserImg} alt='user' height='35px' width='30px'/>
                                    <span className='Navbar-username-logged pl-2'> {currentUser.user.name}</span>
                                </Menu.Item>
                                <Menu.Item>
                                    <Icon className='Navbar-logout-logged' onClick={this.logout} name='sign-out' />
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>
                    </Container>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        errors: state.errors,
        orders: state.orders,
        notifications: state.notifications
    }
}

export default withRouter(connect(mapStateToProps, {authUser, removeError, logout, editProfile, loadOrders, fetchOrders, editOrder, fetchNotifications, acceptOrder})(Navbar))