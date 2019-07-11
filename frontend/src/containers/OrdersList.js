import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchOrders, removeOrder } from '../store/actions/orders'
import { Header, Icon } from 'semantic-ui-react'
import OrderItem from '../components/OrderItem'


class OrdersList extends Component {
    componentDidMount() {
        this.props.fetchOrders()
    }
    render() {
        const { currentUser, orders, removeOrder } = this.props
        const ordersList = orders.map(order => (
            <OrderItem 
                key={order._id}
                date={order.createdAt}
                itemType={order.itemType}
                deliveryType={order.deliveryType}
                price={order.price}
                customer={order.customer.name}
                from={order.from}
                to={order.to}
                description={order.description}
                cancelOrder={removeOrder.bind(this, order.customer._id, order._id)}
                isCorrectCustomer={currentUser.user.id === order.customer._id}
                removeOrder={removeOrder.bind(this, order.boxman._id, order._id)}
                isCorrectBoxman={currentUser.user.id === order.boxman._id}
            />
        ))
        return (
            <div className='mt-3 row'>
                {ordersList}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        orders: state.orders
    }
}

export default connect(mapStateToProps, {fetchOrders, removeOrder})(OrdersList) 