import React from 'react'
import Moment from 'react-moment'
import { Card, Icon, Image } from 'semantic-ui-react'
import DefaultImage from '../images/profile-placeholder.jpg'
import FoodImage from '../images/pasta.jpg'
import GroceriesImage from '../images/groceries.jpg'

const OrderItem = (
    {
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
        // removeOrder,
        orderStatus
    }
) => {
    var orderImage = DefaultImage
    if (itemType === 'food') {
        orderImage = FoodImage
    } else {
        orderImage = GroceriesImage
    }
    var deliveryIcon = deliveryType === 'regular' ? <Icon name='wait'/> : <Icon name='shipping fast'/>
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
                    {orderStatus==='myOrders' && <button className='btn btn-outline-danger'>Cancel</button>}
                    {orderStatus==='pending' && <button className='btn btn-outline-success'>Deliver</button>}
                    {orderStatus==='toDeliver' && <button className='btn btn-outline-success'>Delivered</button>}
                </Card.Content>
            </Card>
        </div>
    )
}


export default OrderItem
