import React, { Component } from 'react'
import axios from 'axios'
import { Container, Divider, Form, Icon, Message } from 'semantic-ui-react'
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
        this.handleFbLogin = this.handleFbLogin.bind(this)
        this.fbLogin = this.fbLogin.bind(this)
    }

    componentWillMount() {
        this.props.removeError()
        window.fbAsyncInit = (() => {
            window.FB.init({
                appId: '1220894838080543',
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v3.2',
            });
        })(
        ((d, s, id) => {
            const fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            const js = d.createElement(s);
            js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk'),);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        var authType
        if(this.props.register && this.props.customer){
            authType = "registerCustomer"
        }
        else if(this.props.register && this.props.boxman){
            authType = "registerBoxman"
        }
        else if(this.props.login && this.props.customer){
            authType = "loginCustomer"
        }
        else{
            authType = "loginBoxman"
        }
        this.props
        .onAuth(authType, this.state)
        .then(() => {
            this.props.push('/')
        })
        .catch(() => {
            this.setState({
                email: "",
                name: "",
                password: ""
            })
            return;
        });
    }

    handleFbLogin = (userData) => {
        var authType
        if(this.props.register && this.props.customer){
            authType = "fbRegisterCustomer"
        }
        else if(this.props.register && this.props.boxman){
            authType = "fbRegisterBoxman"
        }
        else if(this.props.login && this.props.customer){
            authType = "fbLoginCustomer"
        }
        else{
            authType = "fbLoginBoxman"
        }
        this.props
        .onAuth(authType, userData)
        .then(() => {
            if(this.props.register)
                this.props.history.push("/")
            else
                this.props.history.push('/')
        })
        .catch(() => {
            this.setState({
                email: "",
                name: "",
                password: ""
            })
            return;
        });
    } 

    fbLogin() {
        window.FB.login(
            responseLogin => {
                if (responseLogin.authResponse) {
                    axios.get(`https://graph.facebook.com/${responseLogin.authResponse.userID}?fields=id,email,name&access_token=${responseLogin.authResponse.accessToken}`)
                    .then((response) => {
                        let user = response.data
                        var userData = {
                            fbId: user.id,
                            name: user.name,
                            email: user.email
                        }
                        debugger
                        this.handleFbLogin(userData)
                    })
                    .catch((error) => {
                        console.log(error);
                        this.props.history.push('/')
                    });
                    // window.FB.api('/me?fields=email,first_name,last_name,picture', onClick(responseLogin));
                } else {
                    // eslint-disable-next-line
                    console.log('User cancelled login or did not fully authorize.');
                    this.props.history.push('/')
                }
            },
            { scope: 'public_profile,email' },
        );
    }

    render() {
        const { email, name, password} = this.state
        const { errors, heading, buttonText, register } = this.props
        return (
            <Container className='Authform'>
                <h1 className='Authform-header mt-2' size='huge'>{heading}</h1>
                {errors.message && (
                    <div className='Authform-error mt-2 mb-2'>
                        <Message negative>
                            <Message.Header>Something Went Wrong</Message.Header>
                            <p>{errors.message}</p>
                        </Message>
                    </div>
                )}
                <Form className='Authform-form' onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <label htmlFor='email'>Email</label>
                        <input id='email' type='email' name='email' value={email} placeholder='Email' onChange={this.handleChange} required/>
                    </Form.Field>
                    {register && (
                        <Form.Field>
                            <label htmlFor='name'>Full Name</label>
                            <input id='name' type='text' name='name' value={name} placeholder='Full name' onChange={this.handleChange} required/>
                        </Form.Field>
                    )}
                    <Form.Field>
                        <label htmlFor='password'>Password</label>
                        <input id='password' type='password' name='password' value={password} placeholder='Password' onChange={this.handleChange} required/>
                    </Form.Field>
                    <div className='Authform-button-center'><button className='Authform-submit btn' type='submit'><Icon name='mail'/>{buttonText} WITH EMAIL</button></div>
                </Form>
                <Divider horizontal>OR</Divider>
                <div className='Authform-button-center'><button className='Authform-fb-button btn' onClick={this.fbLogin}><Icon name='facebook f'/>{buttonText} WITH FACEBOOK</button></div>
            </Container>
        )
    }
}
