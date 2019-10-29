import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react'


const mapStyles = {

  float:"right",
  width: '50%',
  height: '100%',
  background: '#0103B0',
};

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEYf;

// const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY; //DISBALE MAPS API


export class GoogleMap extends Component {

  state = {
    searchTerm: "",
    showingInfoWindow: this.props.clicked,  //Hides or the shows the infoWindow
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
      });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    // const desiredPizzaplaces = this.state.pizzaplaces.filter(p =>
    // p.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    // console.log(desiredPizzaplaces)
    //   const onlyPizza = this.props.pizzaplaces.filter(p =>
    const onlyPizza = this.state.allPizzaPlaces.filter(p =>
    p.name.toLowerCase().includes(this.props.searchTerm))

    return <Map
                  google={this.props.google}
                  zoom={14}
                  style={mapStyles}
                  initialCenter={{
                   lat: this.state.lat,
                   lng: this.state.long
                  }}
                  center={{
                    lat: this.props.lat,
                    lng: this.props.long,
                  }}
                  >

                  {onlyPizza.map(pizzaplace =>{
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
