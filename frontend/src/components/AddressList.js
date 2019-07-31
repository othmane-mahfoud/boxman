import React, { Component } from 'react'
import axios from 'axios'
import { Form, Input, Icon } from 'semantic-ui-react'
import AddressItem from './AddressItem'
import '../styles/AddressList.css'

export default class AddressList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addresses : [],
            showForm : false,
            newAddress : ''
        }
    }

    componentWillMount = async () => {
        try {
            let res = await axios.get(`/api/customer/${this.props.currentUser.user._id}/profile`)
            let addresses = res.data.addresses
            this.setState({
                addresses
            })
        }
        catch(err) {
            console.log(err)
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let newAddresses = [...this.state.addresses]
        newAddresses.push(this.state.newAddress)
        this.setState({
            addresses: newAddresses,
            showForm: false,
            newAddress: ''
        }, () => {
            this.props.editProfile(this.props.currentUser.user._id, this.props.currentUser.user.role, {addresses: this.state.addresses})
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        })
    }

    removeAddress = (index) => {
        let previous = [...this.state.addresses]
        let newAddresses = previous.filter((address, idx) => idx !== index)
        this.setState({
            addresses: newAddresses,
            showForm: false,
            newAddress: ''
        }, () => {
            this.props.editProfile(this.props.currentUser.user._id, this.props.currentUser.user.role, {addresses: this.state.addresses})
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        })
    }

    handleClick = (event) => {
        this.setState({
            showForm: true
        })
    }

    render() {
        const { addresses, newAddress, showForm } = this.state
        const addressList = addresses.map((address, index) => (
            <AddressItem 
                index={index}
                address={address}
                removeAddress={this.removeAddress.bind(this, index)}
            />
        ))
        return (
            <div className='row mt-2'>
                <div className='col-lg-9 col-sm-12'>
                    <div>
                        {showForm && (
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Field>
                                    <label>Address</label>
                                    <div className="Item-Input ui action input">
                                        <Input 
                                            transparent
                                            className='OrderForm-input'
                                            icon='map marker alternate' 
                                            iconPosition='left' 
                                            type="text" 
                                            placeholder="Add an address"
                                            name='newAddress'
                                            value={newAddress}
                                            onChange={this.handleChange}
                                        />
                                        <button className="btn AddItem" type='submit'><Icon name='add'/></button>
                                    </div>
                                </Form.Field>
                            </Form>
                        )}
                        {!showForm && (
                            <p className='centerAddBtn'><button className='btn addressAddBtn' onClick={this.handleClick}>Add a new Address</button></p>
                        )}
                    </div>
                    <div>
                        {addressList}
                    </div>
                </div>
            </div>
        )
    }
}
