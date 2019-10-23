import React, { Component, Fragment } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react'


const mapStyles = {

  float:"right",
  width: '50%',
  height: '100%',
  background: '#0130A0',
};

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export class GoogleMap extends Component {

  state = {
    searchTerm: "",
    showingInfoWindow: this.props.showInfoWindow,  //Hides or the shows the infoWindow
    clicked: false,     //Shows the infoWindow to the selected place upon a marker         //Shows the infoWindow to the selected place upon a marker
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {},
    long: this.props.long,
    lat: this.props.lat,
    newForm: false,
    allPizzaPlaces: [...this.props.pizzaplaces],
    pizzaplaces: this.props.pizzaplaces,
  };

  onMarkerClick = (props, marker, e) =>
      this.setState({
        long: props.position.lng,
        lat: props.position.lat,
        selectedPlace: props || this.props.chosenPizza.join(''),
        activeMarker: marker,
        showingInfoWindow: true
      }
);

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  // handleSubmit = (event, place) => {
  // event.preventDefault();
  // fetch('http://localhost:3000/pizzaplaces' , {
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(place)
  // })
  // .then(resp => resp.json())
  // .then(pizzaplace => {
  //   let resp = pizzaplace.address.split(" ").join("+")
  //   fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${resp}&key=${API_KEY}`)
  //   .then(resp => resp.json())
  //   .then(response => {
  //     pizzaplace.long = response.results[0].geometry.location.lng
  //     pizzaplace.lat = response.results[0].geometry.location.lat
  //   }).then(
  //   this.setState(prevState =>({
  //     pizzaplaces: [...prevState.pizzaplaces, pizzaplace]
  //   }))
  // )
  // })
  // .then(this.setState({
  //   newForm: !this.state.newForm
  //   }))
  // }

  render() {
    // const desiredPizzaplaces = this.state.pizzaplaces.filter(p =>
    // p.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    // console.log(desiredPizzaplaces)
    //   const onlyPizza = this.props.pizzaplaces.filter(p =>
    const onlyPizza = this.state.allPizzaPlaces.filter(p =>
    p.name.toLowerCase().includes(this.props.searchTerm))

    console.log(this.props.searchTerm, this.state.allPizzaPlaces, onlyPizza)
    return <Map
                  google={this.props.google}
                  zoom={14}
                  style={mapStyles}
                  initialCenter={{
                   lat: this.state.lat,
                   lng: this.state.long
                  }}
                  center={{
                    lat: this.props.lat || this.props[0].lat,
                    lng: this.props.long || this.props[0].lng,
                  }}
                  >

                  {this.props.pizzaplaces.map(pizzaplace =>{
                  return <Marker
                      position={{lat: pizzaplace.lat, lng: pizzaplace.long}}
                      onClick={this.onMarkerClick}
                      name={pizzaplace.name}
                      address={pizzaplace.address}
                      key={pizzaplace.id}
                    />
                    })
                  }
                  <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                  >
                    <div>
                      <h4>{this.state.selectedPlace.name}</h4>
                      <h5>{this.state.selectedPlace.address}</h5>
                    </div>
                  </InfoWindow>
                  </Map>

  }
}


export default GoogleApiWrapper({
    apiKey: API_KEY
})(GoogleMap);
