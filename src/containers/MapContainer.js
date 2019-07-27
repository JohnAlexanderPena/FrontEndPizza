import React, { Component, Fragment } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react'
import Search from '../components/Search'
import PizzaContainer from './PizzaContainer'
import NewPizzaPlace from '../components/NewPizzaPlace'
import PizzaDetail from '../components/PizzaDetail'


const mapStyles = {

  width: '50%',
  height: '50%',
  position: "absolute",
  top: "16px",
  left: "500px",
  border: "3px solid #73AD21",
  overflow: "auto:",
};

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export class MapContainer extends Component {

  state = {
    pizzaplaces: [],
    searchTerm: "",
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {},
    long: -73.987448000,
    lat: 40.700885000,
    newForm: false,
    selectedPizzaPlace: {},
    clicked: false      //Shows the infoWindow to the selected place upon a marker         //Shows the infoWindow to the selected place upon a marker
  };

  componentDidMount(){
    fetch('http://localhost:3000/pizzaplaces')
    .then(res => res.json())
    .then(pizzaplaces => {
      this.setState({
        pizzaplaces: pizzaplaces
      })
    })
  }

  handlePizzaClick = (event, pizzaplace) =>
  {
    this.setState({
      selectedPizzaPlace: pizzaplace,
      clicked: true,
      lat: pizzaplace.lat,
      lng: pizzaplace.long,
    })
  }


  handleChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    })

    event.preventDefault();
    const desiredPizzaplaces = this.state.pizzaplaces.filter(p =>
    p.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))

    if(desiredPizzaplaces !== this.state.searchTerm){
      return null
    } else {
    this.setState({
      long: desiredPizzaplaces[0].long,
      lat: desiredPizzaplaces[0].lat
      })
    }
  }

  onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
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


  addPizzaButton = () => {
    this.setState({
      newForm: !this.state.newForm
    })
  }

  handleSubmit = (event, place) => {
  event.preventDefault();
  fetch('http://localhost:3000/pizzaplaces' , {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(place)
  })
  .then(resp => resp.json())
  .then(pizzaplace => {
    let resp = pizzaplace.address.split(" ").join("+")
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${resp}&key=${API_KEY}`)
    .then(resp => resp.json())
    .then(response => {
      pizzaplace.long = response.results[0].geometry.location.lng
      pizzaplace.lat = response.results[0].geometry.location.lat
    }).then(
    this.setState(prevState =>({
      pizzaplaces: [...prevState.pizzaplaces, pizzaplace]
    }))
  )
  })
  .then(this.setState({
    newForm: !this.state.newForm
    }))
  }

  handleReviewEdit = (event) => {
   this.setState({
     clicked: false
   })
 }


  render() {
    const desiredPizzaplaces = this.state.pizzaplaces.filter(p =>
    p.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))

    return (
  <div>
      {

      (this.state.newForm === false) ?
      <Fragment>
            <h1>Welcome to $1 Slices, {this.props.state.username}!</h1>
        <Search searchTerm={this.state.searchTerm} handleChange={this.handleChange} handleSearch={this.handleSearch}/>
            <h3>Want to Share a Pizza Place?</h3>
          <button onClick={this.addPizzaButton}>Add New Pizza</button>
    <div>
      {
        (this.state.clicked) ?
          <div className="maincontainer">
            <div className="pizzacontainer">
          <PizzaDetail handleReviewEdit={this.handleReviewEdit} pizzaplace={this.state.selectedPizzaPlace} />
          </div>
          <Map
                  google={this.props.google}
                  zoom={14}
                  style={mapStyles}
                  initialCenter={{
                   lat: this.state.lat,
                   lng: this.state.long
                  }}
                  center={{
                    lat: this.state.lat,
                    lng: this.state.long,
                  }}
                  >
                  {desiredPizzaplaces.map(pizzaplace =>{
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
                </div>
        :
        <div className="maincontainer">
          <div className="pizzacontainer">
          <PizzaContainer clicked={this.state.clicked} handlePizzaClick={this.handlePizzaClick} pizzaplaces={desiredPizzaplaces} />
          </div>
        <Map
              google={this.props.google}
              zoom={14}
              style={mapStyles}
              initialCenter={{
               lat: this.state.lat,
               lng: this.state.long
              }}
              center={{
                lat: this.state.lat,
                lng: this.state.long,
              }}
              >
              {desiredPizzaplaces.map(pizzaplace =>{
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
            </div>
       }
     </div>
        </Fragment>
          :

        <NewPizzaPlace addPizzaButton={this.addPizzaButton} addhandleSubmit={this.handleSubmit}/>
    }
  </div>
    )
  }
}


export default GoogleApiWrapper({
    apiKey: API_KEY
})(MapContainer);
