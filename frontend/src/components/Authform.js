import React, { Component } from 'react'
import { Container, Form } from 'semantic-ui-react'
import '../styles/Authform.css'

export default class Authform extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            name: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit(e) {
        e.preventDefault();
    }
    render() {
        const { email, name} = this.state
        return (
            <Container className='Authform'>
                <h1 className='Authform-header mt-2' size='huge'>Register to BoxMan</h1>
                <Form className='Authform-form' onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <label htmlFor='email'>Email</label>
                        <input id='email' type='email' name='email' value={email} placeholder='Email' onChange={this.handleChange}/>
                    </Form.Field>
                    {this.props.register && (
                        <Form.Field>
                            <label htmlFor='username'>Full Name</label>
                            <input id='username' type='text' name='username' value={name} placeholder='Username' onChange={this.handleChange}/>
                        </Form.Field>
                    )}
                    <Form.Field>
                        <label htmlFor='password'>Password</label>
                        <input id='password' type='password' name='password' placeholder='Password' onChange={this.handleChange}/>
                    </Form.Field>
                    <div className='button-center'><button className='Authform-submit btn p-3' type='submit'>SIGN UP WITH EMAIL</button></div>
                </Form>
            </Container>
        )
    }
}
