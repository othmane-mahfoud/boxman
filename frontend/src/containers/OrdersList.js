import React, { Component } from 'react'
import '../styles/OrdersList.css'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchOrders, editOrder } from '../store/actions/orders'
import { getProfile } from '../store/actions/users'
import { Header, Icon } from 'semantic-ui-react'
import OrderItem from '../components/OrderItem'

class OrdersList extends Component {
    componentDidMount() {
        this.props.fetchOrders(this.props.currentUser.user._id, this.props.currentUser.user.role)
    }

    render() {
        const { currentUser, orders, editOrder, getProfile } = this.props
        if(currentUser.user.role === 'boxman') {
            var filteredOrders = orders.filter(order => (order.status !== 'delivered') && (order.status !== 'none'))
            var ordersList = filteredOrders.map((order, index) => (
                <OrderItem 
                    key={order._id}
                    id={order._id}
                    index={index}
                    date={order.createdAt}
                    minPrice={order.minPrice}
                    maxPrice={order.maxPrice}
                    from={order.from}
                    to={order.to}
                    description={order.description}
                    items={order.items}
                    status={order.status}
                    estimatedPrice={order.estimatedPrice}
                    estimatedDuration={order.estimatedDuration}
                    estimatedDistance={order.estimatedDistance}
                    currentUser={currentUser}
                    customer={order.customer}
                    boxman={order.boxman}
                    editOrder={editOrder}
                    getProfile={getProfile}
                />
            ))
            var placeHolderText = (
                <div key='none' className="jumbotron jumbotron-fluid OrdersList-segment bg-white" >
                    <div className="container">
                        <Header icon>
                            <Icon name='shopping basket' />
                            You have nothing to deliver<br/>
                            You can have some rest and enjoy your day
                        </Header><br/>
                    </div>
                </div>
            )
        }
        else {
            var filteredOrders = orders.filter(order => (order.status !== 'delivered'))
            var ordersList = filteredOrders.map((order, index) => (
                <OrderItem 
                    key={order._id}
                    id={order._id}
                    index={index}
                    date={order.createdAt}
                    minPrice={order.minPrice}
                    maxPrice={order.maxPrice}
                    from={order.from}
                    to={order.to}
                    description={order.description}
                    items={order.items}
                    status={order.status}
                    estimatedPrice={order.estimatedPrice}
                    estimatedDuration={order.estimatedDuration}
                    estimatedDistance={order.estimatedDistance}
                    currentUser={currentUser}
                    customer={order.customer}
                    boxman={order.boxman}
                    editOrder={editOrder}
                    getProfile={getProfile}
                />
            ))
            var placeHolderText = (
                <div key='none' className="jumbotron jumbotron-fluid OrdersList-segment bg-white" >
                    <div className="container">
                        <Header icon>
                            <Icon name='shopping basket' />
                            Looks like you have no orders yet, need anything?<br/>
                            Start ordering with BoxMan
                        </Header><br/>
                        <NavLink to={`/users/${currentUser.user._id}/orders/new`}><button className='Navbar-register btn mr-2'>Start Ordering</button></NavLink>
                    </div>
                </div>
            )
        }
        return (
            <div className='row'>
                <div className='col-lg-9 col-sm-12'>
                    {ordersList.length === 0 ? placeHolderText : ordersList}
                </div>
                {currentUser.user.role === 'customer' && 
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
                }
                {currentUser.user.role === 'boxman' && 
                    <div className='col-lg-3 col-sm-12 mt-0'>
                        <NavLink to={`/boxman/${currentUser.user._id}/assistance`}>
                            <div className='btn Profile-request'>
                                <div className='Profile-request-content pl-2 pt-5'>
                                    <div><Icon name='map'/></div>
                                    <div className='Profile-request-text'>Delivery Assistant<Icon name='arrow right'/></div>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                }
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

export default connect(mapStateToProps, {fetchOrders, editOrder, getProfile})(OrdersList) 