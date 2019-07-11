import React, { Component } from 'react'
import { Message, Form, Button, Header, Container, Input, TextArea, Select } from 'semantic-ui-react'
import { addNewOrder } from '../store/actions/orders'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class OrderForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemType: "other",
            from: "",
            to: "",
            description: "",
            deliveryType: "Regular",
            price: 0
        }
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    handleItemType = (event, data) => {
        this.setState({
            itemType: data.value,
        })
    }

    handleDeliveryType = (event, data) => {
        this.setState({
            deliveryType: data.value,
        })
    } 

    handleNewOrder = event => {
        event.preventDefault()
        // this.props.postNewMessage(this.state.message)
        // this.setState({
        //     message: ""
        // })
        // this.props.history.push('/')
        debugger
        this.props.addNewOrder(this.state)
        this.props.history.push('/orders')
    }

    render() {
        const { itemType, from, to, description, deliveryType, price } = this.state
        const itemOptions = [
            { key: 0, text: 'Groceries', value: 'groceries' },
            { key: 1, text: 'Food', value: 'food' },
            { key: 2, text: 'Other', value: 'other' },
        ]
        const deliveryOptions = [
            { key: 0, text: 'Regular', value: 'Regular' },
            { key: 1, text: 'Express', value: 'Express' },
        ]
        return (
            <Container>
                <h1 className='OrderForm-Header mt-4 mb-4'>Order whatever you want and receive it in minutes</h1>
                {this.props.errors.message && (
                    <div className='OrderForm-error mt-2 mb-2'>
                        <Message negative>
                            <Message.Header>Something Went Wrong!</Message.Header>
                            <p>{this.props.errors.message}</p>
                        </Message>
                    </div>
                )}
                <Form onSubmit={this.handleNewOrder}>
                    <Form.Group widths='equal'>
                        <Form.Field
                            control={Select}
                            options={itemOptions}
                            label= 'Item Type'
                            placeholder='Item'
                            name='itemType'
                            value={itemType}
                            onChange={this.handleItemType}
                        />
                        <Form.Field
                            control={Select}
                            options={deliveryOptions}
                            label= 'Delivery Type'
                            placeholder='Delivery'
                            name='deliveryType'
                            value={deliveryType}
                            onChange={this.handleDeliveryType}
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field
                            id='form-input-control-first-name'
                            control={Input}
                            label='From'
                            placeholder='From'
                            name='from'
                            value={from}
                            onChange={this.handleChange}
                        />
                        <Form.Field
                            id='form-input-control-last-name'
                            control={Input}
                            label='To'
                            placeholder='To'
                            name='to'
                            value={to}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Field
                        id='form-textarea-control-opinion'
                        control={TextArea}
                        label='Description'
                        placeholder='Describe the Item(s) '
                        name='description'
                        value={description}
                        onChange={this.handleChange}
                    />
                    <button className='OrderForm-submit btn-success' type='submit'>Order</button>
                </Form>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        errors: state.errors
    }
}

export default withRouter(connect(mapStateToProps, {addNewOrder})(OrderForm))
