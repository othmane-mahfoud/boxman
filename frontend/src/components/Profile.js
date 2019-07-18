import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Form, Icon } from 'semantic-ui-react'
import '../styles/Profile.css'
import UserImg from '../images/user.png'

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.currentUser.user.name,
            email: props.currentUser.user.email,
            phoneNumber:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.editUser(this.props.currentUser.user._id, this.state)
        .then(() => {
            this.props.history.push('/')
        })
        .catch(() => {
            this.setState({
                name: this.props.currentUser.user.name,
                email: this.props.currentUser.user.email,
                phoneNumber:''
            })
            return;
        });
    }

    render() {
        const { currentUser } = this.props
        const { name, email, phoneNumber } = this.state
        return (
            <div className='container'>
                <div className='row'>
                    <div className='Profile col-lg-6 col-sm-4'>
                        <div className='Profile-heading'>
                            <img className='Navbar-avatar-logged' src={UserImg} alt='user' height='30px' width='30px'/>
                            <span className='Navbar-username-logged pl-2'>{currentUser.user.name}</span>
                        </div>
                        <div className='Profile-form mt-2'>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Field>
                                    <label className='Profile-form-label'>Full name</label>
                                    <input className='Profile-form-input' value={name}/>
                                </Form.Field>
                                <Form.Field>
                                    <label className='Profile-form-label'>Email</label>
                                    <input className='Profile-form-input' onChange={this.handleChange} name='phoneNumber' id='phoneNumber' value={email}/>
                                </Form.Field>
                                <Form.Field>
                                    <label className='Profile-form-label' htmlFor='phoneNumber'>Phone number</label>
                                    <input className='Profile-form-input' onChange={this.handleChange} name='phoneNumber' id='phoneNumber' value={phoneNumber} placeholder='Phone Number' />
                                </Form.Field>
                                <div className='Profile-right'><button className='btn Profile-submit mt-2' onClick={this.handleSubmit} type='submit'>Update</button></div>
                            </Form>
                        </div>
                    </div>
                    <div className='col-lg-3 col-sm-4 pt-4'>
                        <NavLink to={`/users/${currentUser.user._id}/orders/new`}>
                            <div className='btn Profile-request'>
                                <div className='Profile-request-content pl-2 pt-5'>
                                    <div><Icon name='pencil'/></div>
                                    <div className='Profile-request-text'>Request Order <Icon name='arrow right'/></div>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                </div>
                
            </div>
        )
    }
}
