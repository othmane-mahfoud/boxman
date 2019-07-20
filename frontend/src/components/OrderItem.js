import React, { Component } from 'react'
import Moment from 'react-moment'
import { NavLink } from 'react-router-dom'
import { Card, Icon, Image, List } from 'semantic-ui-react'
import '../styles/OrderItem.css'
import DefaultImage from '../images/pasta.jpg'
import UserImg from '../images/user.png'
// import FoodImage from '../images/pasta.jpg'
// import GroceriesImage from '../images/groceries.jpg'
// import HealthImage from '../images/health.png'
// import CourierImage from '../images/courier.jpeg'
// import ShoppingImage from '../images/shopping.jpg'

class OrderItem extends Component {
    pickOrder = () => {
        const {currentUser, id} = this.props
        this.props.editOrder(currentUser.user._id, currentUser.user.role, id, { status: 'picked' })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    deliverOrder = () => {
        const {currentUser, id} = this.props
        this.props.editOrder(currentUser.user._id, currentUser.user.role, id, { status: 'delivered' })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        const { id, index, date, from, items, to, description, minPrice, maxPrice, estimatedPrice, status, currentUser } = this.props
        const itemsList = items.map(item => (
            <List.Item className='item'>{item.name}</List.Item>
        ))
        return(
            <div className='OrderItem mb-2 ml-1'>
                <div class="card">
                    <div class="card-header bg-white">
                        Order #{index+1}
                    </div>
                    <div class="card-body">
                        <div className='row'>
                            <div className='col-lg-6 col-sm-12'>
                                <small className='text-muted'>
                                    <Moment format='Do MMM YYYY - HH:mm'>{date}</Moment>
                                </small><br />
                                <small className='text-muted'>
                                    Price: {minPrice} dhs - {maxPrice} dhs
                                </small><br />
                                <Icon name='map marker alternate' />
                                <small className='text-muted'>{from}</small>
                                <p class="card-text pt-3">{description}</p>
                                <List bulleted>
                                    {itemsList}
                                </List>
                            </div>
                            <div className='col-lg-6 col-sm-12'>
                                <div className='boxman-area row pt-2'>
                                    <div className='col-2'>
                                        <img src={UserImg} alt='user' height='40px' width='40px'></img>
                                    </div>
                                    <div className='col-8'>
                                        <span className='pl-2'>Hamid Lmardi</span><br/>
                                        <small className='text-muted pl-2'>+2126874565</small>
                                    </div>
                                    <div className='col-2'>
                                        <Icon className='mr-4 pt-2' name='phone' />
                                    </div>
                                </div>
                                {currentUser.user.role === 'customer' 
                                    ? <p className='centerBtn mt-2'><button className='OrderItem-btn'>Track Order</button></p>
                                    : <div>
                                        <p className='centerBtn mt-3'>
                                            {status !== 'picked' && <button className='OrderItem-btn' onClick={this.pickOrder}>Picked</button>}
                                            {status === 'picked' && <button className='OrderItem-btn' onClick={this.deliverOrder}>Delivered</button>}
                                        </p>
                                      </div>
                                }

                            </div>
                        </div>

                    </div>
                    <div class="card-footer bg-white">
                        <div className='row'>
                            <div className='estimationText col-6'>
                                <div className='estimatedPriceText'>Estimated price</div>
                                <div className='estimatedTimeText'>Estimated time and distance</div>
                            </div>
                            <div className='col-6'>
                                <div className='estimatedPriceValue alignRight'>120</div>
                                <div className='estimatedTimeValue alignRight'>25min</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}


export default OrderItem
