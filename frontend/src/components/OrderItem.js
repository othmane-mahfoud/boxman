import React, { Component } from 'react'
import axios from 'axios'
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

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phone: ''
        }
    }

    componentWillMount = () => {
        if(this.props.currentUser.user.role === 'customer') {
            if(this.props.boxman) {
                axios.get(`/api/customer/${this.props.customer}/orders/${this.props.id}`)
                .then(res => {
                    console.log(res.data)
                    this.setState({
                        name: res.data.boxman.name,
                        phone: res.data.boxman.phone
                    })
                })
            }
        }
        else {
            axios.get(`/api/boxman/${this.props.currentUser.user._id}/orders/${this.props.id}`)
            .then(res => {
                this.setState({
                    name: res.data.customer.name,
                    phone: res.data.customer.phone
                })
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

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
        this.props.deliverOrder(currentUser.user._id, currentUser.user.role, id)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        const { id, index, date, from, items, to, description, minPrice, maxPrice, estimatedPrice, estimatedDuration, estimatedDistance, status, currentUser, customer, boxman } = this.props
        const itemsList = items.map(item => (
            <List.Item key={item._id} className='item'>{item.name}</List.Item>
        ))
        return(
            <div className='OrderItem mb-3 ml-1'>
                <div className="card">
                    <div className="card-header bg-white">
                        Order #{index+1}
                    </div>
                    <div className="card-body">
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
                                <p className="card-text pt-3">{description}</p>
                                <List bulleted>
                                    {itemsList}
                                </List>
                            </div>
                            <div className='col-lg-6 col-sm-12'>
                                {this.state.name 
                                    ?(
                                        // <div className='boxman-area row pt-2'>
                                        //     <div className='col-2'>
                                        //         <img src={UserImg} alt='user' height='40px' width='40px'></img>
                                        //     </div>
                                        //     <div className='col-8'>
                                        //         <span className='pl-2'>{this.state.name}</span><br/>
                                        //         <small className='text-muted pl-2'>{this.state.phone}</small>
                                        //     </div>
                                        //     <div className='col-2'>
                                        //         <Icon className='mr-4 pt-2' name='phone' />
                                        //     </div>
                                        // </div>
                                        <div>
                                        <div className='OrderItem-boxman-area card'>
                                            <div className='card-body'>
                                                <p className='meet'><img className='boxman-img' src={UserImg} height='30' width='30'/></p>
                                                <p className='meet'>{this.state.name}</p>
                                                <p className='meet text-muted'><Icon name='phone'/> {this.state.phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                    :(
                                        <div className='boxman-area row pt-2'>
                                            <div className='col-2'>
                                                <Icon className='mr-4 pt-2' name='clock outline' />
                                            </div>
                                            <div className='col-10'>
                                                <span className='pl-2'>Wait up!</span><br/>
                                                <small className='text-muted pl-2'>We're finding a boxman</small>
                                            </div>
                                        </div>
                                    )
                                }
                                {currentUser.user.role === 'customer' && this.state.name !== '' && (
                                    <NavLink to={`/customer/trackorder/${id}`}><p className='centerBtn mt-2'><button className='OrderItem-btn'>Track Order</button></p></NavLink>
                                )}
                                {currentUser.user.role === 'boxman' && this.state.name !== '' && (
                                    <div>
                                        <p className='centerBtn mt-3'>
                                            {status !== 'picked' && <button className='OrderItem-btn' onClick={this.pickOrder}>Mark as Picked</button>}
                                            {status === 'picked' && <button className='OrderItem-btn' onClick={this.deliverOrder}>Mark as Delivered</button>}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                    <div className="card-footer bg-white">
                        <div className='row'>
                            <div className='estimationText col-6'>
                                <div className='estimatedPriceText'>Estimated price</div>
                                <div className='estimatedTimeText'>Estimated distance and duration</div>
                            </div>
                            <div className='col-6'>
                                <div className='estimatedPriceValue alignRight'>{estimatedPrice} dhs</div>
                                <div className='estimatedTimeValue alignRight'>{estimatedDistance}/{estimatedDuration}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}


export default OrderItem
