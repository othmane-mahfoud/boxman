import React, {Component} from 'react'
import { connect } from 'react-redux'
import '../styles/OrdersTimeline.css'
import OrdersList from '../containers/OrdersList'


class OrdersTimeline extends Component{
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false
        }
    }
    render(){
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

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        errors: state.errors
    }
}

export default connect(mapStateToProps)(OrdersTimeline)