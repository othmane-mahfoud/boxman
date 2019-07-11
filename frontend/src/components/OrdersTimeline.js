import React, { Component } from 'react'
import OrdersList from '../containers/OrdersList'
export default class OrdersTimeline extends Component {
    render() {
        return (
            <div className='OrdersTimeline container'>
                <h1>Pending Orders</h1>
                <OrdersList />
                <h1>To Deliver</h1>
                <OrdersList />
                <h1>My Orders</h1>
                <OrdersList />
            </div>
        )
    }
}
