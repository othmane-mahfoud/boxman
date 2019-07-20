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
    componentWillMount() {
        
    }
    render(){
        return (
            <div className='OrdersTimeline container'>
                <OrdersList />
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