import React, { Component } from 'react'
import axios from 'axios'
import Moment from 'react-moment'
import { Icon } from 'semantic-ui-react'
import Navbar from '../containers/Navbar'
import Footer from '../components/Footer'
import '../styles/TrackOrder.css'
import UserImg from '../images/user.png'

var interval
var map

export default class TrackOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: '',
            from: '',
            to: '',
            estimatedPrice: '',
            estimatedDistance: '',
            estimatedDuration: '',
            status: '',
            name: '',
            phone: '',
            currentLocation: []
        }
    }

    componentWillMount() {
        interval = setInterval(() => {
            axios.get(`/api/customer/${this.props.currentUser.user._id}/orders/${this.props.match.params.order_id}`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    date: res.data.createdAt,
                    from: res.data.from,
                    to: res.data.to,
                    estimatedPrice: res.data.estimatedPrice,
                    estimatedDistance: res.data.estimatedDistance,
                    estimatedDuration: res.data.estimatedDuration,
                    status: res.data.status,
                    name: res.data.boxman.name,
                    phone: res.data.boxman.phone,
                    currentLocation: res.data.boxman.currentLocation
                }, () => this.updateMap())
            })
        }, 2000);
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.initMap()
        }, 3000);
    }

    componentWillUnmount = () => {
        clearInterval(interval)
    }

    initMap = () => {
        map = new window.google.maps.Map(document.getElementById('TrackOrder-map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 12
        });
        var currentLocation = {
            lat: this.state.currentLocation[0],
            lng: this.state.currentLocation[1]
        }
        debugger
        map.setCenter(currentLocation)
    }

    updateMap = () => {
        var currentLocation = {
            lat: this.state.currentLocation[0],
            lng: this.state.currentLocation[1]
        }
        var marker = new window.google.maps.Marker({
            map: map,
            position: currentLocation
        });
    }

    render() {
        const {date, from, to, estimatedPrice, estimatedDistance, estimatedDuration, status, name, phone, currentLocation} = this.state
        return (
            <div>
                <Navbar />
                <div className='TrackOrder container'>
                    <div className='row'>
                        <div className='col-lg-6 col-sm-12'>
                            <div className='card ml-1'>
                                <div className='card-header TrackOrder-header bg-white'> 
                                    Track Order
                                </div>
                                <div className='card-body'>
                                    <div id='TrackOrder-map'></div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6 col-sm-12'>
                            <div className="card ml-1">
                                <div className="card-header TrackOrder-header bg-white">
                                    Order Details
                                </div>
                                <div className="card-body">
                                    <p className='TrackOrder-status'>{status.toUpperCase()}</p>
                                    {status==='assigned' && (
                                        <div className="progress TrackOrder-progress mb-3">
                                            <div className="progress-bar TrackOrder-progress-bar-step1" role="progressbar" aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    )}
                                    {status==='picked' && (
                                        <div className="progress TrackOrder-progress mb-3">
                                            <div className="progress-bar TrackOrder-progress-bar-step2" role="progressbar" aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    )}
                                    {status==='delivered' && (
                                        <div className="progress TrackOrder-progress mb-3">
                                            <div className="progress-bar TrackOrder-progress-bar-step3" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    )}
                                    <p><Icon name='clock outline'></Icon> Ordered at:  <span className='text-muted'><Moment format='HH'>{date}</Moment>h<Moment format='mm'>{date}</Moment>min</span></p>
                                    <p><Icon name='map marker alternate'></Icon> from: {from}</p>
                                    <p><Icon name='map marker alternate'></Icon> to: {to}</p>
                                    <div >
                                        <p className='meet'>Meet your Boxman</p>
                                        <div className='TrackOrder-boxman-area card'>
                                            <div className='card-body'>
                                                <p className='meet'><img className='boxman-img' src={UserImg} height='30' width='30'/></p>
                                                <p className='meet'>{name}</p>
                                                <p className='meet text-muted'><Icon name='phone'/> {phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer bg-white">
                                    <div className='row'>
                                        <div className='estimationText col-6'>
                                            <div className='estimatedPriceText'>Estimated price</div>
                                            <div className='estimatedTimeText'>Estimated distance and duration</div>
                                        </div>
                                        <div className='col-6'>
                                            <div className='estimatedPriceValue alignRight'>{estimatedPrice} dhs</div>
                                            <div className='estimatedTimeValue alignRight'>{estimatedDistance}/{estimatedDuration}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
