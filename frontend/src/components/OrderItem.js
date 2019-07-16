import React from 'react'
import Moment from 'react-moment'
import {NavLink} from 'react-router-dom'
import '../styles/OrderItem.css'
import { Card, Icon, Image } from 'semantic-ui-react'
import DefaultImage from '../images/profile-placeholder.jpg'
import FoodImage from '../images/pasta.jpg'
import GroceriesImage from '../images/groceries.jpg'
import HealthImage from '../images/health.png'
import CourierImage from '../images/courier.jpeg'
import ShoppingImage from '../images/shopping.jpg'

const OrderItem = (
    {
        id,
        date, 
        itemType, 
        deliveryType, 
        from, 
        to, 
        description, 
        customer, 
        price, 
        isCorrectCustomer, 
        // isCorrectBoxman, 
        cancelOrder,
        removeOrder,
        orderStatus,
        editOrder
    }
) => {
    var orderImage = DefaultImage
    if (itemType === 'food') {
        orderImage = FoodImage
    } 
    else if(itemType === 'groceries'){
        orderImage = GroceriesImage
    }
    else if(itemType === 'shopping'){
        orderImage = ShoppingImage
    }
    else if(itemType === 'courier'){
        orderImage = CourierImage
    }
    else if(itemType === 'healthcare'){
        orderImage = HealthImage
    }
    var deliveryIcon = deliveryType === 'Regular' ? <Icon name='wait'/> : <Icon name='shipping fast'/>
    return(
        <div className='OrderItem col-sm-6 col-md-4 col-lg-3'>
            <Card>
                <Image src={orderImage} wrapped ui={false} />
                <Card.Content>
                    {/* <Card.Header>Matthew</Card.Header> */}
                    <Card.Meta>
                        <Moment format='Do MMM YYYY - HH:mm'>{date}</Moment><br />
                        {deliveryType} {deliveryIcon}
                    </Card.Meta>
                    <Card.Description>
                        <strong>From: </strong>{from} <br />
                        <strong>To: </strong>{to} <br />
                        <strong>Description: </strong>{description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    {orderStatus==='myOrders' && <button className='btn btn-outline-danger OrderItem-btn' onClick={cancelOrder}>Cancel</button>}
                    {orderStatus==='pending' && <button className='btn btn-outline-success OrderItem-btn' onClick={editOrder}>Pick Order</button>}
                    {orderStatus==='toDeliver' && <button className='btn btn-outline-success OrderItem-btn' onClick={removeOrder}>Delivered</button>}
                    {orderStatus==='toDeliver' && <NavLink to={`/${id}/assistance`}><div className='btn btn-outline-warning OrderItem-btn'>Assistance</div></NavLink>}
                </Card.Content>
            </Card>
        </div>
    )
}


export default OrderItem
