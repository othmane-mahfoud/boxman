import React from 'react'
import Moment from 'react-moment'
import {NavLink} from 'react-router-dom'
import '../styles/OrderItem.css'
import { Card, Icon, Image, List } from 'semantic-ui-react'
import DefaultImage from '../images/pasta.jpg'
import UserImg from '../images/user.png'
// import FoodImage from '../images/pasta.jpg'
// import GroceriesImage from '../images/groceries.jpg'
// import HealthImage from '../images/health.png'
// import CourierImage from '../images/courier.jpeg'
// import ShoppingImage from '../images/shopping.jpg'

const OrderItem = (
    {
        id,
        date, 
        from, 
        items,
        to, 
        description, 
        minPrice,
        maxPrice,
        estimatedPrice,
        status
    }
) => {
    const itemsList = items.map(item => (
        <List.Item className='item'>{item.name}</List.Item>
    ))
    return(
        <div className='OrderItem mb-2'>
            <div class="card">
                <div class="card-header bg-white">
                    Order #1
                </div>
                <img src={DefaultImage} class="card-img-top" alt="..."></img>
                <div class="card-body">
                    <div className='row'>
                        <div className='col-lg-6 col-sm-12'>
                            <small className='text-muted'>
                                <Moment format='Do MMM YYYY - HH:mm'>{date}</Moment>
                            </small><br />
                            <small className='text-muted'>
                                Price: {minPrice} dhs - {maxPrice} dhs
                            </small><br />
                        </div>
                        <div className='col-lg-6 col-sm-12'>
                            <div className='boxman-area row pt-2'>
                                <div className='col-2'>
                                    <img src={UserImg} height='40px' width='40px'></img>
                                </div>
                                <div className='col-8'>
                                    <span className='pl-2'>Hamid Lmardi</span><br/>
                                    <small className='text-muted pl-2'>+2126874565</small>
                                </div>
                                <div className='col-2'>
                                    <Icon className='mr-4 pt-2' name='phone' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Icon name='map marker alternate' />
                    <small className='text-muted'>{from}</small>
                    <p class="card-text pt-3">{description}</p>
                    <List bulleted>
                        {itemsList}
                    </List>
                </div>
                <div class="card-footer bg-white">
                    <div className='row'>
                        <div className='estimationText col-6'>
                            <div className='estimatedPriceText'>Estimated price</div>
                            <div className='estimatedTimeText'>Estimated time and distance</div>
                        </div>
                        <div className='col-6'>
                            <div className='estimatedPriceValue alignRight'>{estimatedPrice}</div>
                            <div className='estimatedTimeValue alignRight'>25min</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default OrderItem
