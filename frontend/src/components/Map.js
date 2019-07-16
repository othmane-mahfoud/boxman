import React, { Component } from 'react'
import '../styles/Map.css'

export default class Map extends Component {

    constructor(props) {
        super(props)
        this.state = {
            address: '',
            start: '',
            end: '',
            steps:[]
        }
    }

    // componentWillMount() {
    //     const script = document.createElement("script");
    //     const API = 'AIzaSyAsVrKaug8bcVX2QdAN9OpxL_3pMYVNEbQ';
    //     script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&callback=initMap`;
    //     script.async = true;
    //     document.body.appendChild(script);
    // }
    
    componentDidMount() {
        this.initMap()
        this.initMap4()
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

    codeAddress = e => {
        e.preventDefault()
        var map = new window.google.maps.Map(document.getElementById('map2'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 15
          });
        // var address = document.getElementById('address').value;
        var address = this.state.address
        window.geocoder = new window.google.maps.Geocoder();
        window.geocoder.geocode( { 'address': address}, function(results, status) {
            if (status === 'OK') {
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

    calcRoute = e => {
        e.preventDefault()
        var directionsService = new window.google.maps.DirectionsService();
        var directionsDisplay = new window.google.maps.DirectionsRenderer();
        
        var chicago = new window.google.maps.LatLng(41.850033, -87.6500523);
        var mapOptions = {
            zoom:7,
            center: chicago
        }
        var map = new window.google.maps.Map(document.getElementById('map3'), mapOptions);
        directionsDisplay.setMap(map);
        var start = this.state.start;
        var end = this.state.end;
        var request = {
          origin: start,
          destination: end,
          travelMode: 'DRIVING'
        };
        directionsService.route(request, (result, status) => {
          if (status === 'OK') {
            console.log(result)
            directionsDisplay.setDirections(result);
            var dirSteps = []
            for (var i = 0; i < result.routes[0].legs[0].steps.length; i++) {
                dirSteps.push(result.routes[0].legs[0].steps[i].instructions)
            }
            this.setState({
                steps: dirSteps
            })
          }
        });
    }

    initMap4 = () => {
        var directionsDisplay = new window.google.maps.DirectionsRenderer;
        var directionsService = new window.google.maps.DirectionsService;
        var map = new window.google.maps.Map(document.getElementById('map4'), {
          zoom: 12,
          center: {lat: 41.85, lng: -87.65}
        });
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('right-panel'));

        var control = document.getElementById('floating-panel');
        control.style.display = 'block';
        map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(control);

        var onChangeHandler = () => {
          this.calculateAndDisplayRoute(directionsService, directionsDisplay);
        };
        document.getElementById('start').addEventListener('change', onChangeHandler);
        document.getElementById('end').addEventListener('change', onChangeHandler);
      }

      calculateAndDisplayRoute = (directionsService, directionsDisplay) => {
        var start = document.getElementById('start').value;
        var end = document.getElementById('end').value;
        directionsService.route({
          origin: start,
          destination: end,
          travelMode: 'DRIVING'
        }, (response, status) => {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
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
        const stepsList = this.state.steps.map(s => <li>{s}</li>)
        return (
            <div className='Map'>
                <h3>Google Map my Location</h3>
                <div id="map"></div>
                <h3>Geocoding Example</h3>
                <form onSubmit={this.codeAddress}>
                    <input type='text' name='address' value={this.state.address} onChange={this.handleChange}/>
                    <button type='submit'>Show me</button>
                </form>
                <div id="map2"></div>
                <h3>Directions Example</h3>
                <form onSubmit={this.calcRoute}>
                    <label>Start: </label><input type='text' name='start' value={this.state.start} onChange={this.handleChange}/>
                    <label>End: </label><input type='text' name='end' value={this.state.end} onChange={this.handleChange}/>
                    <button type='submit'>Show me</button>
                </form>
                <div id="map3"></div>
                <ul>
                    {stepsList}
                </ul>
                <h3>Directions with Steps Example</h3>
                <div id="floating-panel">
                <strong>Start:</strong>
                <select id="start">
                    <option value="chicago, il">Chicago</option>
                    <option value="st louis, mo">St Louis</option>
                    <option value="joplin, mo">Joplin, MO</option>
                    <option value="oklahoma city, ok">Oklahoma City</option>
                    <option value="amarillo, tx">Amarillo</option>
                    <option value="gallup, nm">Gallup, NM</option>
                    <option value="flagstaff, az">Flagstaff, AZ</option>
                    <option value="winona, az">Winona</option>
                    <option value="kingman, az">Kingman</option>
                    <option value="barstow, ca">Barstow</option>
                    <option value="san bernardino, ca">San Bernardino</option>
                    <option value="los angeles, ca">Los Angeles</option>
                </select>
                <br />
                <strong>End:</strong>
                <select id="end">
                    <option value="chicago, il">Chicago</option>
                    <option value="st louis, mo">St Louis</option>
                    <option value="joplin, mo">Joplin, MO</option>
                    <option value="oklahoma city, ok">Oklahoma City</option>
                    <option value="amarillo, tx">Amarillo</option>
                    <option value="gallup, nm">Gallup, NM</option>
                    <option value="flagstaff, az">Flagstaff, AZ</option>
                    <option value="winona, az">Winona</option>
                    <option value="kingman, az">Kingman</option>
                    <option value="barstow, ca">Barstow</option>
                    <option value="san bernardino, ca">San Bernardino</option>
                    <option value="los angeles, ca">Los Angeles</option>
                </select>
                </div>
                <div id="right-panel"></div>
                {/* <div id="map"></div> */}
                <div id="map4"></div>
            </div>
        )
    }
}
