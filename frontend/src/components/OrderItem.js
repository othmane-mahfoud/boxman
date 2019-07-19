import React, { Component } from 'react'
import Moment from 'react-moment'
import {NavLink} from 'react-router-dom'
import '../styles/OrderItem.css'
import { Card, Icon, Image, List } from 'semantic-ui-react'
import DefaultImage from '../images/pasta.jpg'
import UserImg from '../images/user.png'
// import FoodImage from '../images/pasta.jpg'
// import GroceriesImage from '../images/groceries.jpg'
// import HealthImage from '../images/health.png'
// import CourierImage from '../images/courier.jpeg'
// import ShoppingImage from '../images/shopping.jpg'

class OrderItem extends Component {
    // componentDidMount = () => {
    //     this.initMap()
    // }

    // initMap = () => {
    //     var directionsDisplay = new window.google.maps.DirectionsRenderer;
    //     var directionsService = new window.google.maps.DirectionsService;
    //     var map = new window.google.maps.Map(document.getElementById('googleMap'), {
    //         zoom: 12,
    //         center: {lat: 41.85, lng: -87.65}
    //     });
    //     // var map = new window.google.maps.Map(document.getElementsByClassName('googleMap'), {
    //     //     zoom: 12,
    //     //     center: {lat: 41.85, lng: -87.65}
    //     // });
    //     directionsDisplay.setMap(map);
    //     // var control = document.getElementById('floating-panel');
    //     // control.style.display = 'block';
    //     // map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(control);

    //     // var onChangeHandler = () => {
    //     this.calculateAndDisplayRoute(directionsService, directionsDisplay);
    //     // };
    //     // document.getElementById('start').addEventListener('change', onChangeHandler);
    //     // document.getElementById('end').addEventListener('change', onChangeHandler);
    // }

    // calculateAndDisplayRoute = (directionsService, directionsDisplay) => {
    //     var start = this.props.from
    //     var end = this.props.to
    //     directionsService.route({
    //         origin: start,
    //         destination: end,
    //         travelMode: 'DRIVING'
    //     }, (response, status) => {
    //         if (status === 'OK') {
    //             directionsDisplay.setDirections(response);
    //         } else {
    //             window.alert('Directions request failed due to ' + status);
    //         }
    //     });
    // }

    render() {
        const { id, date, from, items, to, description, minPrice, maxPrice, estimatedPrice, status, currentUser } = this.props
        const itemsList = items.map(item => (
            <List.Item className='item'>{item.name}</List.Item>
        ))
        return(
            <div className='OrderItem mb-2'>
                <div class="card">
                    <div class="card-header bg-white">
                        Order #1
                    </div>
                    {/* <img src={DefaultImage} class="card-img-top" alt="..."></img> */}
                    {/* <div id='googleMap'></div> */}
                    <div class="card-body">
                        <div className='row'>
                            <div className='col-lg-6 col-sm-12'>
                                <small className='text-muted'>
                                    <Moment format='Do MMM YYYY - HH:mm'>{date}</Moment>
                                </small><br />
                                <small className='text-muted'>
                                    Price: {minPrice} dhs - {maxPrice} dhs
                                </small><br />
                                <Icon name='map marker alternate' />
                                <small className='text-muted'>{from}</small>
                                <p class="card-text pt-3">{description}</p>
                                <List bulleted>
                                    {itemsList}
                                </List>
                            </div>
                            <div className='col-lg-6 col-sm-12'>
                                <div className='boxman-area row pt-2'>
                                    <div className='col-2'>
                                        <img src={UserImg} height='40px' width='40px'></img>
                                    </div>
                                    <div className='col-8'>
                                        <span className='pl-2'>Hamid Lmardi</span><br/>
                                        <small className='text-muted pl-2'>+2126874565</small>
                                    </div>
                                    <div className='col-2'>
                                        <Icon className='mr-4 pt-2' name='phone' />
                                    </div>
                                </div>
                                {currentUser.user.role === 'customer' 
                                    ? <p className='centerBtn mt-2'><button className='OrderItem-btn'>Track Order</button></p>
                                    : <p className='centerBtn mt-2'><button className='OrderItem-btn'>Order Assistance</button></p>
                                }

                            </div>
                        </div>
                        {/* <Icon name='map marker alternate' />
                        <small className='text-muted'>{from}</small>
                        <p class="card-text pt-3">{description}</p>
                        <List bulleted>
                            {itemsList}
                        </List> */}
                    </div>
                    <div class="card-footer bg-white">
                        <div className='row'>
                            <div className='estimationText col-6'>
                                <div className='estimatedPriceText'>Estimated price</div>
                                <div className='estimatedTimeText'>Estimated time and distance</div>
                            </div>
                            <div className='col-6'>
                                <div className='estimatedPriceValue alignRight'>120</div>
                                <div className='estimatedTimeValue alignRight'>25min</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}


export default OrderItem
