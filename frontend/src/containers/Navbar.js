import React, { Component } from 'react'
import '../styles/Navbar.css'
import { Checkbox, Container, Menu, Modal } from 'semantic-ui-react'
import Authform from '../components/Authform'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { authUser, logout } from '../store/actions/auth'
import { removeError } from '../store/actions/errors'


class Navbar extends Component {
    logout = e => {
        e.preventDefault()
        this.props.logout()
        this.props.history.push('/')
    }
    render() {
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
                            <Menu.Menu position='right' className='mr-2'>
                                <span className='Navbar-user p-3'>Hello, {currentUser.user.name}</span>
                                <button className='Navbar-register btn mr-2' onClick={this.logout}>LOGOUT</button>
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