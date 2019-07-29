import React, { Component } from 'react'
import axios from 'axios'
import Navbar from '../containers/Navbar'
import Footer from '../views/Footer'
import '../styles/OrderAssistance.css'

export default class OrderAssistance extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentLocation: {},
            destination: '',
            waypts: [],
            pickupPoints: [],
            deliveryPoints: []
        }
        this.getDistance = this.getDistance.bind(this)
    }

    componentWillMount = async () => {
        this.getCurrentLocation()
        this.getWaypoints()
        this.sortDistances()
    }

    componentDidMount = async () => {
        setTimeout(() => {
            this.initMap()
        }, 3000);
    }

    getWaypoints = async () => {
        try {
            let res = await axios.get(`/api/boxman/${this.props.match.params.id}/orders`)
            let orders = res.data
            let filteredOrders = orders.filter(order => order.status !== 'delivered')
            let points = []
            filteredOrders.forEach(order => {
                if(order.status !== 'picked')
                    points.push({
                        location: order.from,
                        stopover: true
                    })
                points.push({
                    location: order.to,
                    stopover: true
                })
            });
            this.setState({
                waypts: points
            }, () => {
                if(points.length !== 0)
                this.getFurthestPoint()
            })
        }
        catch(err) {
            console.log(err)
        }
    }

    getCurrentLocation = async () => {
        try {
            let res = await axios.get(`/api/boxman/${this.props.match.params.id}/profile`)
            let boxman = res.data
            this.setState({
                currentLocation: {
                    lat: boxman.currentLocation[0],
                    lng: boxman.currentLocation[1]
                }
            })
        }
        catch(err) {
            console.log(err)
        }
    }

    getFurthestPoint = () => {
        let origin = new window.google.maps.LatLng(this.state.currentLocation.lat, this.state.currentLocation.lng)
        let service = new window.google.maps.DistanceMatrixService();
        let dest = this.state.waypts.map(p => p.location)
        service.getDistanceMatrix({
            origins: [origin],
            destinations: dest,
            travelMode: 'DRIVING',
        }, (response, status) => {
            console.log(response)
            let points = response.rows[0].elements
            let max = -1
            var index = 0
            for(var i = 0; i < points.length; i++) {
                if(points[i].distance.value > max) {
                    max = points[i].distance.value
                    index = i
                }
            }
            this.setState({
                destination: dest[index]
            })
        });
    }

    getDistance = (origin, destination) => {
        let service = new window.google.maps.DistanceMatrixService();
        var dist = 0;
        service.getDistanceMatrix({
            origins: [origin],
            destinations: [destination],
            travelMode: 'DRIVING',
        }, (response, status) => {
            // console.log(response.rows[0].elements[0].distance.value)
            dist = response.rows[0].elements[0].distance.value
        });
    }

    initMap() {
        var directionsService = new window.google.maps.DirectionsService;
        var directionsDisplay = new window.google.maps.DirectionsRenderer;
        var map = new window.google.maps.Map(document.getElementById('OrderAssistance-map'), {
            zoom: 12,
            center: {lat: 41.85, lng: -87.65}
        });
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('OrderAssistance-panel'));
        this.calculateAndDisplayRoute(directionsService, directionsDisplay);
    }

    sortDistances = () => {
        let service = new window.google.maps.DistanceMatrixService();
        var array = [
            { location: "Gare Rabat Ville, Rabat Morocco", visited: false, distance: 0 },
            { location: "McDonalds Agdal, Rabat, Morocco", visited: false, distance: 0 }
        ]
        const sortedLocations = [] 
        var start = "United Remote Avenue Atlas Rabat Morocco"
        for(var i = 0; i < array.length; i++) {
            for(var j = 0; j < array.length; j++) {
                (function(j) {
                    service.getDistanceMatrix({
                        origins: [start],
                        destinations: [array[j].location],
                        travelMode: 'DRIVING',
                    }, (response, status) => {
                        debugger
                        array[j].distance = response.rows[0].elements[0].distance.value
                    });
                })(j)
            }
            var min = Number.POSITIVE_INFINITY
            var minIndex = 0
            for(var k = 0; k < array.length; k++) {
                (function(k) {
                    if(array[k].distance < min && !array[k].visited) {
                        min = array[k].distance
                        minIndex = k
                    }
                })(j)
            }
            sortedLocations.push(array[minIndex].location)
            start = array[minIndex].location
            array[minIndex].visited = true
            console.log(array)
        }
        sortedLocations.forEach(location => {
            console.log(location)
        });
    }

    calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
            origin: this.state.currentLocation,
            destination: this.state.destination,
            waypoints: this.state.waypts,
            // optimizeWaypoints: true,
            travelMode: 'DRIVING'
        }, (response, status) => {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                console.log('error')
            }
        });
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className='OrderAssistance container mt-3'>
                    <div className='row'>
                        <div className='col-lg-6 col-sm-12'>
                            <div className='card mt-2'>
                                <div className='card-header'>
                                    Map
                                </div>
                                <div className='card-body'>
                                    <div id="OrderAssistance-map"></div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6 col-sm-12'>
                            <div id="OrderAssistance-panel"></div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
