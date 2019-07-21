import React, { Component } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import '../styles/OrderForm.css'
import { Message, Form, List, Input, TextArea, Icon } from 'semantic-ui-react'
import { addOrder } from '../store/actions/orders'
import { addError, removeError } from '../store/actions/errors'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class OrderForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            from: '',
            to: '',
            description: '',
            newItem:'',
            items: [],
            minPrice: '',
            maxPrice: '',
            estimatedDistance: '',
            estimatedDuration: '',
            estimatedPrice: 0,
            isEstimated: false,
            success: false
        }
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    handleEstimation = (event) => {
        event.preventDefault()
        const { from, to, description, items, minPrice, maxPrice } = this.state 
        this.estimateValues(from, to, minPrice)
    }

    handleNewOrder = (event) => {
        event.preventDefault()
        const { from, to, description, items, minPrice, maxPrice, estimatedDistance, estimatedDuration, estimatedPrice } = this.state 
        const order = {
            from,
            to,
            description,
            items,
            minPrice,
            maxPrice,
            estimatedDistance,
            estimatedDuration,
            estimatedPrice
        }
        this.props.addOrder(order)
        .then(() => {
            this.setState({ success: true })
            this.props.history.push('/')
            this.props.removeError()
        })
        .catch(err => {
            this.props.addError(err.message)
            this.setState({
                from: '',
                to: '',
                description: '',
                newItem:'',
                items: [],
                minPrice: '',
                maxPrice: '',
                estimatedPrice: 0,
                estimatedDistance: '',
                estimatedDuration: '',
                isEstimated: false,
                success: false
            })
        })
    }

    estimateValues = (from, to, minPrice) => {
        var directionsService = new window.google.maps.DirectionsService();
        var request = {
            origin: from,
            destination: to,
            travelMode: 'DRIVING'
        };
        directionsService.route(request, (result, status) => {
            if (status === 'OK') {
                this.calculateEstimations(from, to, minPrice)
            }
            else {
                this.props.addError('invalid location')
            }
        });
    }

    calculateEstimations = (from, to, minPrice) => {
        var service = new window.google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
        {
            origins: [from],
            destinations: [to],
            travelMode: 'DRIVING',
        }, (response, status) => {
            var estimations = {
                distance : response.rows[0].elements[0].distance.text,
                duration : response.rows[0].elements[0].duration.text,
                price : Math.floor(10 + parseInt(minPrice) + (response.rows[0].elements[0].distance.value * 0.001))
            }
            this.setState({
                isEstimated: true,
                estimatedPrice: estimations.price,
                estimatedDuration: estimations.duration,
                estimatedDistance: estimations.distance
            })
        });
    }

    addItem = (e) => {
        e.preventDefault()
        var newItems = [...this.state.items]
        newItems.push({
            name: this.state.newItem,
            picked: false
        })
        this.setState({
            items: newItems
        })
    }

    removeItem = (id) => {
        var newItems = this.state.items.filter((item, index) => index !== id)
        this.setState({
            items: newItems
        })
    }

    render() {
        const { from, to, description, newItem, items, minPrice, maxPrice, estimatedPrice, estimatedDistance, estimatedDuration, isEstimated } = this.state
        const itemsList = items.map((item, index) => (
            <List.Item key={index} id={index} className='Item p-3 mb-1'>
                <List.Content floated='right'>
                    <Icon className='RemoveItem' onClick={() => this.removeItem(index)} name='minus' />
                </List.Content>
                <List.Content>{item.name}</List.Content>
            </List.Item>
        ))
        return (
            <div>
                <Navbar />
                <div className='OrderForm container'>
                    <div className='OrderForm-Header row'>
                        <div className='col-lg-12 col-sm-12'>
                            <h1 className='OrderForm-Header-text mt-4 mb-4'>Request an Order</h1>
                            {this.props.errors.message && (
                                <div className='OrderForm-error mt-2 mb-2'>
                                    <Message negative>
                                        <Message.Header>Something Went Wrong!</Message.Header>
                                        <p>{this.props.errors.message}</p>
                                    </Message>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='OrderForm-form row'>
                        <div className='col-lg-6 col-sm-12'>
                            <Form onSubmit={this.handleEstimation}>
                                <Form.Field>
                                    <label>Description</label>
                                    <TextArea
                                        className='OrderForm-input'
                                        placeholder='Description or additional comments' 
                                        name='description'
                                        value={description}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Items</label>
                                    <div className="Item-Input ui action input">
                                        <Input 
                                            transparent
                                            className='OrderForm-input'
                                            icon='shopping basket' 
                                            iconPosition='left' 
                                            type="text" 
                                            placeholder="Add an item to your cart"
                                            name='newItem'
                                            value={newItem}
                                            onChange={this.handleChange}
                                        />
                                        <button onClick={this.addItem} className="btn AddItem"><Icon name='add'/></button>
                                    </div>
                                </Form.Field>
                                <List className='Items-list' verticalAlign='middle'>
                                    {itemsList}
                                </List>
                                <Form.Group widths='equal'>
                                    <Form.Field>
                                        <label>Min</label>
                                        <Input 
                                            className='OrderForm-input'
                                            icon='dollar' 
                                            iconPosition='left' 
                                            placeholder='Minimum Price'
                                            name='minPrice'
                                            value={minPrice}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Max</label>
                                        <Input 
                                            className='OrderForm-input'
                                            icon='dollar' 
                                            iconPosition='left' 
                                            placeholder='Maximum Price' 
                                            name='maxPrice'
                                            value={maxPrice}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                </Form.Group>
                                {isEstimated === false && (<div className='OrderForm-center'>
                                    <button className='OrderForm-submit btn' type='submit'>Place Order</button>
                                </div>)}
                            </Form>
                        </div>
                        <div className='col-lg-6 col-sm-12'>
                            <Form>
                                <Form.Field>
                                    <label>Addresses</label>
                                    <Input 
                                        className='OrderForm-input'
                                        icon='map marker alternate' 
                                        iconPosition='left' 
                                        placeholder='Pickup Address' 
                                        name='from'
                                        value={from}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Input 
                                        className='OrderForm-input'
                                        icon='map marker alternate' 
                                        iconPosition='left' 
                                        placeholder='Destination Address' 
                                        name='to'
                                        value={to}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                            </Form>
                            {isEstimated === true && (
                                <div>
                                    <div className='estimations row mt-3 p-2'>
                                        <div className='estimationText col-6'>
                                            <div className='estimatedPriceText pl-3'>Estimated price</div>
                                            <div className='estimatedTimeText pl-3'>Estimated time and distance</div>
                                        </div>
                                        <div className='col-6'>
                                            <div className='estimatedPriceValue alignRight pr-3'>{estimatedPrice} DHS</div>
                                            <div className='estimatedTimeValue alignRight pr-3'>{estimatedDistance}/{estimatedDuration}</div>
                                        </div>
                                    </div>
                                    <div className='OrderForm-center mt-3'>
                                        <button className='OrderForm-submit btn' onClick={this.handleNewOrder}>Confirm Order</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        errors: state.errors
    }
}

export default withRouter(connect(mapStateToProps, {addOrder, addError, removeError})(OrderForm))
