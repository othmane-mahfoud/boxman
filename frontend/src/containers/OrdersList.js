import React, { Component } from 'react'
import '../styles/OrdersList.css'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchOrders, removeOrder, editOrder } from '../store/actions/orders'
import { Header, Icon } from 'semantic-ui-react'
import OrderItem from '../components/OrderItem'


class OrdersList extends Component {
    componentDidMount() {
        this.props.fetchOrders(this.props.currentUser.user._id, this.props.currentUser.user.role)
    }
    render() {
        const { currentUser, orders } = this.props
        var ordersList = orders.map(order => (
            <OrderItem 
                key={order._id}
                id={order._id}
                date={order.createdAt}
                minPrice={order.minPrice}
                maxPrice={order.maxPrice}
                from={order.from}
                to={order.to}
                description={order.description}
                items={order.items}
                currentUser={currentUser}
            />
        ))
        var customerOrdersPlaceHolder = (
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
        var boxmanOrdersPlaceHolder = (
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
        return (
            <div className='row'>
                <div className='col-lg-9 col-sm-12'>
                    {(ordersList.length === 0) && (currentUser.user.role === 'customer') ? customerOrdersPlaceHolder : ordersList}
                    {(ordersList.length === 0) && (currentUser.user.role === 'boxman') ? boxmanOrdersPlaceHolder : ordersList}
                    {/* <OrderItem 
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
                    /> */}
                    {/* {ordersList} */}
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

export default connect(mapStateToProps, {fetchOrders})(OrdersList) 