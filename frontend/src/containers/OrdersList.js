import React, { Component } from 'react'
import '../styles/OrdersList.css'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchOrders, removeOrder, editOrder } from '../store/actions/orders'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'
import OrderItem from '../components/OrderItem'


class OrdersList extends Component {
    componentDidMount() {
        this.props.fetchOrders()
    }
    render() {
        const { currentUser, orders, removeOrder, editOrder } = this.props
        var filteredOrders
        var ordersList
        if(this.props.myOrders){
            filteredOrders = orders.filter(order => (order.customer === currentUser.user.id))
            ordersList = filteredOrders.map(order => (
                <OrderItem 
                    key={order._id}
                    date={order.createdAt}
                    itemType={order.itemType}
                    deliveryType={order.deliveryType}
                    price={order.price}
                    customer={order.customer}
                    from={order.from}
                    to={order.to}
                    description={order.description}
                    cancelOrder={removeOrder.bind(this, currentUser.user.id, order._id)}
                    isCorrectCustomer={currentUser.user.id === order.customer}
                    // removeOrder={removeOrder.bind(this, order.boxman._id, order._id)}
                    // isCorrectBoxman={currentUser.user.id === order.boxman._id}
                    editOrder={editOrder.bind(this, currentUser.user.id, order._id)}
                    orderStatus='myOrders'
                />
            ))
            if(ordersList.length === 0) {
                ordersList.push(
                    <div className="jumbotron jumbotron-fluid OrdersList-segment bg-white" >
                        <div class="container">
                            <Header icon>
                                <Icon name='shopping bag' />
                                Looks like you have no orders yet, need anything?<br/>
                                Start ordering with BoxMan
                            </Header><br/>
                            <NavLink to={`/users/${currentUser.user.id}/orders/new`} className='btn btn-outline-primary'>Start Ordering</NavLink>
                        </div>
                    </div>
                )
            }
        }
        else if(this.props.pending) {
            filteredOrders = orders.filter(order => (order['boxman'] === undefined) && (order.customer !== currentUser.user.id))
            ordersList = filteredOrders.map(order => (
                <OrderItem 
                    key={order._id}
                    date={order.createdAt}
                    itemType={order.itemType}
                    deliveryType={order.deliveryType}
                    price={order.price}
                    customer={order.customer}
                    from={order.from}
                    to={order.to}
                    description={order.description}
                    cancelOrder={removeOrder.bind(this, order.customer, order._id)}
                    // isCorrectCustomer={currentUser.user.id === order.customer}
                    removeOrder={removeOrder.bind(this, order.boxman, order._id)}
                    // isCorrectBoxman={currentUser.user.id === order.boxman._id}
                    editOrder={editOrder.bind(this, currentUser.user.id, order._id)}
                    orderStatus='pending'
                />
            ))
            if(ordersList.length === 0) {
                ordersList.push(
                    <div className="jumbotron jumbotron-fluid OrdersList-segment bg-white" >
                        <div class="container">
                            <Header icon>
                                <Icon name='wait' />
                                Mmmm, looks like no one needs anything. Come check again later!
                            </Header>
                        </div>
                    </div>
                )
            }
        }
        else {
            filteredOrders = orders.filter(order => ((order['boxman'] !== undefined) && (order.boxman === currentUser.user.id)))
            ordersList = filteredOrders.map(order => (
                <OrderItem 
                    key={order._id}
                    date={order.createdAt}
                    itemType={order.itemType}
                    deliveryType={order.deliveryType}
                    price={order.price}
                    customer={order.customer}
                    from={order.from}
                    to={order.to}
                    description={order.description}
                    cancelOrder={removeOrder.bind(this, order.customer, order._id)}
                    isCorrectCustomer={currentUser.user.id === order.customer}
                    removeOrder={removeOrder.bind(this, order.boxman, order._id)}
                    // isCorrectBoxman={currentUser.user.id === order.boxman._id}
                    editOrder={editOrder.bind(this, currentUser.user.id, order._id)}
                    orderStatus='toDeliver'
                />
            ))
            if(ordersList.length === 0) {
                ordersList.push(
                    <div className="jumbotron jumbotron-fluid OrdersList-segment bg-white" >
                        <div class="container">
                            <Header icon>
                                <Icon name='shopping cart' />
                                You're good to go, nothing to deliver for now
                            </Header>
                        </div>
                    </div>
                )
            }
        }
        return (
            <div className='mt-3 mb-4 row'>
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

export default connect(mapStateToProps, {fetchOrders, removeOrder, editOrder})(OrdersList) 