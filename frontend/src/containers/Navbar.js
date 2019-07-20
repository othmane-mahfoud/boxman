import React, { Component } from 'react'
import axios from 'axios'
import Switch from "react-switch";
import { NavLink } from 'react-router-dom'
import '../styles/Navbar.css'
import { Container, Icon, Menu, Modal, Tab } from 'semantic-ui-react'
import Authform from '../components/Authform'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { authUser, logout } from '../store/actions/auth'
import { editProfile } from '../store/actions/users'
import { removeError } from '../store/actions/errors'
import UserImg from '../images/user.png'


class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: true
        }
    }

    componentWillMount() {
        if(this.props.currentUser.user.role === 'boxman'){
            axios.get(`/api/boxman/${this.props.currentUser.user._id}/profile`)
            .then(res => {
                this.setState({
                    active: res.data.active
                })
            })
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

    logout = e => {
        e.preventDefault()
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
        const { authUser, errors, removeError, currentUser } = this.props
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
                                {currentUser.user.role === 'boxman' && 
                                    <Menu.Item>
                                        <span className='active-boxman-label'>Active</span>
                                    </Menu.Item>
                                }
                                {currentUser.user.role === 'boxman' && 
                                    <Menu.Item>
                                        <Switch onChange={this.handleSwitch} checked={this.state.active} />
                                    </Menu.Item>
                                }
                                <Menu.Item>
                                    <Icon className='Navbar-notification-logged' name='bell' />
                                </Menu.Item>
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
        errors: state.errors
    }
}

export default withRouter(connect(mapStateToProps, {authUser, removeError, logout, editProfile})(Navbar))