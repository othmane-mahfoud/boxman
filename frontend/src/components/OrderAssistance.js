import React, { Component } from 'react'
import '../styles/OrderAssistance.css'
import axios from 'axios'

export default class OrderAssistance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            from: "",
            to: ""
        }
    }

    componentWillMount = () => {
        
    }

    componentDidMount = () => {
        axios.get(`/api/users/${this.props.currentUser.user._id}/orders/${this.props.match.params.id}`, {headers: {"Access-Control-Allow-Origin": "*"}})
        .then(res => {
            debugger
            this.setState({
                from: res.data.from,
                to: res.data.to
            })
            this.initMap()
        })
        .catch(err => {
            console.log(err)
        })
    }

    initMap = () => {
        var directionsDisplay = new window.google.maps.DirectionsRenderer;
        var directionsService = new window.google.maps.DirectionsService;
        var map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: {lat: 41.85, lng: -87.65}
        });
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('right-panel'));
        // var control = document.getElementById('floating-panel');
        // control.style.display = 'block';
        // map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(control);

        // var onChangeHandler = () => {
        //     this.calculateAndDisplayRoute(directionsService, directionsDisplay);
        // };
        // document.getElementById('start').addEventListener('change', onChangeHandler);
        // document.getElementById('end').addEventListener('change', onChangeHandler);

        this.calculateAndDisplayRoute(directionsService, directionsDisplay);
    }

    calculateAndDisplayRoute = (directionsService, directionsDisplay) => {
        var { from, to } = this.state
        debugger
        directionsService.route({
            origin: from,
            destination: to,
            travelMode: 'DRIVING'
        }, (response, status) => {
            if (status === 'OK') {
                debugger
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    render() {
        return (
            <div className='OrdersAssistance container'>
                <h1 className='OrdersAssistance-header'>Delivery Assistance</h1>
                <div className='row mt-4'>
                    <div className='col-lg-6' id="map"></div>
                    <div className='col-lg-6' id="right-panel"></div>
                </div>
            </div>
        )
    }
}
