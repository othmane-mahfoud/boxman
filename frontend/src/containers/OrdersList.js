import React, { Component } from 'react'
import '../styles/OrdersList.css'
import { connect } from 'react-redux'
import { fetchOrders, removeOrder } from '../store/actions/orders'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'
import OrderItem from '../components/OrderItem'


class OrdersList extends Component {
    componentDidMount() {
        this.props.fetchOrders()
    }
    render() {
        const { currentUser, orders, removeOrder } = this.props
        var filteredOrders
        var ordersList
        if(this.props.myOrders){
            filteredOrders = orders.filter(order => (order.customer._id === currentUser.user.id))
            ordersList = filteredOrders.map(order => (
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
                    // removeOrder={removeOrder.bind(this, order.boxman._id, order._id)}
                    // isCorrectBoxman={currentUser.user.id === order.boxman._id}
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
                            <button className='btn btn-outline-primary'>Start Ordering</button>
                        </div>
                    </div>
                )
            }
        }
        else if(this.props.pending) {
            filteredOrders = orders.filter(order => (order['boxman'] === undefined))
            ordersList = filteredOrders.map(order => (
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
                    // removeOrder={removeOrder.bind(this, order.boxman._id, order._id)}
                    // isCorrectBoxman={currentUser.user.id === order.boxman._id}
                    orderStatus='pending'
                />
            ))
        }
        else {
            filteredOrders = orders.filter(order => ((order['boxman'] !== undefined) && (order.boxman._id === currentUser.user.id)))
            ordersList = filteredOrders.map(order => (
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
                    // removeOrder={removeOrder.bind(this, order.boxman._id, order._id)}
                    // isCorrectBoxman={currentUser.user.id === order.boxman._id}
                    orderStatus='toDeliver'
                />
            ))
            if(ordersList.length === 0) {
                ordersList.push(
                    // <Segment placeholder className='OrdersList-segment'>
                        
                    // </Segment>
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
                {ordersList.length === 0 ? 'No orders yet' : ordersList}
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