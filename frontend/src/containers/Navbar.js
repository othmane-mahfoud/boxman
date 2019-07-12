import React, { Component } from 'react'
import '../styles/Navbar.css'
import { Container, Dropdown, Icon, Menu, Modal } from 'semantic-ui-react'
import Authform from '../components/Authform'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { authUser, logout } from '../store/actions/auth'
import { removeError } from '../store/actions/errors'


class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selection: ""
        }
    }
    logout = e => {
        e.preventDefault()
        this.props.logout()
        this.props.history.push('/')
    }
    render() {
        const trigger = (
            <span className='Navbar-Dropdown-Name'>
              <Icon name='user' /> Hello, {this.props.currentUser.user.name}
            </span>
          )
          
        const options = [
            {
              key: 'user',
              text: (
                <span>
                  Logged in as <strong>{this.props.currentUser.user.name}</strong>
                </span>
              ),
              disabled: true,
            },
            { key: 'profile', text: (<NavLink className='Navbar-Dropdown-Link' to='/profile'>Your Profile</NavLink>)},
            { key: 'orders', text: (<NavLink className='Navbar-Dropdown-Link' to='/'>Your Orders</NavLink>) },
            { key: 'newOrder', text: (<NavLink className='Navbar-Dropdown-Link' to={`/users/${this.props.currentUser.user._id}/orders/new`}>New Order</NavLink>) },
            { key: 'sign-out', text: <span onClick={this.logout}>Sign Out</span> }
        ]
        const { authUser, errors, removeError, currentUser } = this.props
        if(!currentUser.isAuthenticated){
            return (
                <div className='Navbar pt-4 pb-4'>
                    <Container>
                        <Menu secondary>
                            <Menu.Menu position='right' className='mr-2'>
                                <Modal className='Navbar-modal' trigger={
                                    <button className='Navbar-register btn mr-2'>REGISTER</button>}>
                                    <Modal.Content>
                                        <Authform 
                                            register 
                                            onAuth={authUser}
                                            errors={errors}
                                            removeError={removeError}
                                            buttonText='REGISTER'
                                            heading='Register to BoxMan'
                                            {...this.props}
                                        />
                                    </Modal.Content>
                                </Modal>
                                <Modal className='Navbar-modal' trigger={
                                    <button className='Navbar-login btn mr-2'>LOGIN</button>}>
                                    <Modal.Content>
                                        <Authform 
                                            onAuth={authUser}
                                            errors={errors}
                                            removeError={removeError}
                                            buttonText='LOGIN'
                                            heading='Login to BoxMan!'
                                            {...this.props}
                                        />
                                    </Modal.Content>
                                </Modal>
                            </Menu.Menu>
                        </Menu>
                    </Container>
                </div>
            )
        }
        else {
            return (
                <div className='Navbar-logged pt-4 pb-4'>
                    <Container>
                        <Menu secondary>
                                <div className='Navbar-brand'>BoxMan <i className="fa fa-map-marker" /></div>

                            <Menu.Menu position='right' className='mr-2 pt-2'>
                                {/* <span className='Navbar-user p-3'>Hello, {currentUser.user.name}</span>
                                <button className='Navbar-register btn mr-2' onClick={this.logout}>LOGOUT</button> */}
                                <Dropdown className='Navbar-Dropdown' trigger={trigger} options={options} />
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

export default withRouter(connect(mapStateToProps, {authUser, removeError, logout})(Navbar))