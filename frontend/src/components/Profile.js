import React, { Component } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { Form, Icon } from 'semantic-ui-react'
import '../styles/Profile.css'
import UserImg from '../images/user.png'

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            phone:'',
            success: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillMount = () => {
        axios.get(`/api/${this.props.currentUser.user.role}/${this.props.currentUser.user._id}/profile`)
        .then(res => {
            this.setState({
                name: res.data.name,
                email: res.data.email,
                phone: res.data.phone,
                success: false
            })
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.editProfile(this.props.currentUser.user._id, this.props.currentUser.user.role, this.state)
        .then(() => {
            this.props.history.push('/')
            this.setState({
                success: true
            })
        })
        .catch(() => {
            this.setState({
                name: this.props.currentUser.user.name,
                email: this.props.currentUser.user.email,
                phone:''
            })
            return;
        });
    }

    render() {
        const { currentUser } = this.props
        const { name, email, phone, success} = this.state
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
                                    <input className='Profile-form-input' onChange={this.handleChange} name='name' id='name' value={name}/>
                                </Form.Field>
                                <Form.Field>
                                    <label className='Profile-form-label'>Email</label>
                                    <input className='Profile-form-input' onChange={this.handleChange} name='email' id='email' value={email}/>
                                </Form.Field>
                                <Form.Field>
                                    <label className='Profile-form-label' htmlFor='phone'>Phone number</label>
                                    <input className='Profile-form-input' onChange={this.handleChange} name='phone' id='phone' value={phone} placeholder='Phone Number' />
                                </Form.Field>
                                <div className='Profile-right'><button className='btn Profile-submit mt-2' onClick={this.handleSubmit} type='submit'>Update</button></div>
                            </Form>
                        </div>
                        {success && (
                            <div className="alert alert-success alert-dismissible fade show mt-4" role="alert">
                                <strong>Nice! </strong> We've just updated your personal information.
                                <button onClick={() => this.setState({success: false})} type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        )}
                    </div>
                    {currentUser.user.role === 'customer' && 
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
                    }
                </div>
                
            </div>
        )
    }
}
