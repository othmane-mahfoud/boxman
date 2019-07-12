import React, { Component } from 'react'
import '../styles/Map.css'

export default class Map extends Component {

    constructor(props) {
        super(props)
        this.state = {
            address: ''
        }
    }
    
    componentDidMount() {
        this.initMap()
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    initMap() {
        // The location of Uluru
        // The map, centered at Uluru
        var map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 12
          });
        // The marker, positioned at Uluru
        // var marker = new window.google.maps.Marker({position: uluru, map: map});
        window.infoWindow = new window.google.maps.InfoWindow;
        if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(function(position) {
              var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
  
              window.infoWindow.setPosition(pos);
              window.infoWindow.setContent('Location found.');
              window.infoWindow.open(map);
              map.setCenter(pos);
            }, function() {
              this.handleLocationError(true, window.infoWindow, map.getCenter(), map);
            });
        } else {
            // Browser doesn't support Geolocation
            this.handleLocationError(false, window.infoWindow, map.getCenter(), map);
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        this.codeAddress()
    }

    codeAddress() {
        
        var map = new window.google.maps.Map(document.getElementById('map2'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 15
          });
        // var address = document.getElementById('address').value;
        var address = this.state.address
        window.geocoder = new window.google.maps.Geocoder();
        window.geocoder.geocode( { 'address': address}, function(results, status) {
            if (status === 'OK') {
                alert(results)
                map.setCenter(results[0].geometry.location);
                var marker = new window.google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    handleLocationError(browserHasGeolocation, infoWindow, pos, map) {
        window.infoWindow.setPosition(pos);
        window.infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        window.infoWindow.open(map);
    }

    render() {
        return (
            <div className='Map'>
                <h3>Google Map my Location</h3>
                <div id="map"></div>
                <h3>Geocoding Example</h3>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' name='address' value={this.state.address} onChange={this.handleChange}/>
                    <button type='submit'>Show me</button>
                </form>
                <div id="map2"></div>
            </div>
        )
    }
}
