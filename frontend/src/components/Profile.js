import React, { Component } from 'react'
import { Form, Icon, Image } from 'semantic-ui-react'
import PlaceholderImg from '../images/profile-placeholder.jpg'
import '../styles/Profile.css'

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profileImageUrl: "",
            phoneNumber: "",
            address: ""
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
        this.props.editUser(this.props.currentUser.user.id, this.state)
        .then(() => {
            debugger
            this.props.history.push('/orders')
        })
        .catch(() => {
            this.setState({
                profileImageUrl: "",
                phoneNumber: "",
                address: ""
            })
            return;
        });
    }

    render() {
        const { currentUser } = this.props
        const { profileImageUrl, phoneNumber, address } = this.state
        return (
            <div className='container'>
                <div className='Profile'>
                    <div className='Profile-headings mb-4'>
                        <h2 className='Profile-header'>One more step and you're all set up</h2>
                        <h1 className='Profile-header'>Complete your profile</h1>
                    </div>
                    <div className='Profile-form mt-2'>
                        <div className='Profile-image'>
                            <Image src={profileImageUrl || PlaceholderImg} size='small' circular centered/>
                            <div className='Profile-center'><button className='Profile-upload btn btn-outline-warning mt-3 mb-4'><Icon name='upload'/>Upload</button></div>
                        </div>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <label>Email</label>
                                <input className='bg-light' value={currentUser.user.email} disabled/>
                            </Form.Field>
                            <Form.Field>
                                <label>Full name</label>
                                <input className='bg-light' value={currentUser.user.name} disabled/>
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor='phoneNumber'>Phone number</label>
                                <input onChange={this.handleChange} name='phoneNumber' id='phoneNumber' value={phoneNumber} placeholder='Phone Number ex: 06 XX XX XX XX' />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor='address'>Address</label>
                                <input onChange={this.handleChange} name='address' id='address' value={address} placeholder='Enter your address' />
                            </Form.Field>
                            <div className='Profile-center'><button type='submit' className='btn Profile-submit p-3 mt-2'>EDIT PROFILE</button></div>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
