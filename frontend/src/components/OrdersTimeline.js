import React, { Component } from 'react'
import '../styles/OrdersTimeline.css'
import OrdersList from '../containers/OrdersList'
export default class OrdersTimeline extends Component {
    render() {
        return (
            <div className='OrdersTimeline container'>
                <h1 className='OrdersTimeline-header mt-2'>My Orders</h1>
                <OrdersList myOrders/>
                <h1 className='OrdersTimeline-header mt-4'>To Deliver</h1>
                <OrdersList toDeliver/>
                <h1 className='OrdersTimeline-header mt-4'>Pending Orders</h1>
                <OrdersList pending/>
            </div>
        )
    }
}
