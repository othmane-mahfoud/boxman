import React, { Component } from 'react'
import '../styles/OrdersList.css'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchOrders, removeOrder, editOrder } from '../store/actions/orders'
import { Header, Icon } from 'semantic-ui-react'
import OrderItem from '../components/OrderItem'


class OrdersList extends Component {
    componentDidMount() {
        this.props.fetchOrders()
    }
    render() {
        const { currentUser, orders, removeOrder, editOrder } = this.props
        var filteredOrders = orders.filter(order => (order.customer === currentUser.user._id))
        var ordersList = filteredOrders.map(order => (
            <OrderItem 
                key={order._id}
                id={order._id}
                date={order.createdAt}
                itemType={order.itemType}
                deliveryType={order.deliveryType}
                price={order.price}
                customer={order.customer}
                from={order.from}
                to={order.to}
                description={order.description}
                cancelOrder={removeOrder.bind(this, currentUser.user._id, order._id)}
                editOrder={editOrder.bind(this, currentUser.user._id, order._id)}
            />
        ))
        var ordersPlaceHolder = (
            <div key='none' className="jumbotron jumbotron-fluid OrdersList-segment bg-white" >
                <div className="container">
                    <Header icon>
                        <Icon name='shopping basket' />
                        Looks like you have no orders yet, need anything?<br/>
                        Start ordering with BoxMan
                    </Header><br/>
                    <NavLink to={`/users/${currentUser.user._id}/orders/new`} className='OrdersList-submit outline green-white'>Start Ordering</NavLink>
                </div>
            </div>
        )
        return (
            <div className='row'>
                {/* {ordersList.length === 0 ? ordersPlaceHolder : ordersList} */}
                <div className='col-lg-9 col-sm-12'>
                    <OrderItem 
                        from='3416 Tenmile Road, Waltham, Massachusetts, 3 floor'
                        to='Test Address'
                        description='This is just a fake order to design the order card'
                        minPrice={100}
                        maxPrice={200}
                        estimatedPrice={120}
                        items={[
                            {name: 'banana', picked:false}, {name: 'bread', picked: false}
                        ]}
                        status='assigned'
                    />
                    <OrderItem 
                        from='3416 Tenmile Road, Waltham, Massachusetts, 3 floor'
                        to='Test Address'
                        description='This is just a fake order to design the order card'
                        minPrice={100}
                        maxPrice={200}
                        estimatedPrice={120}
                        items={[
                            {name: 'banana', picked:false}, {name: 'bread', picked: false}
                        ]}
                        status='assigned'
                    />
                </div>
                <div className='col-lg-3 col-sm-12 mt-0'>
                    <NavLink to={`/users/${currentUser.user._id}/orders/new`}>
                        <div className='btn Profile-request'>
                            <div className='Profile-request-content pl-2 pt-5'>
                                <div><Icon name='pencil'/></div>
                                <div className='Profile-request-text'>Request Order <Icon name='arrow right'/></div>
                            </div>
                        </div>
                    </NavLink>
                </div>
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