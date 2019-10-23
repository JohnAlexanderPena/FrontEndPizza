import React, { Component } from 'react';
// import MapContainer from './MapContainer'
import Login from '../components/Login'
import GoogleMap from './GoogleMap'
import Search from '../components/Search'
import PizzaContainer from './PizzaContainer'
import NewPizzaPlace from '../components/NewPizzaPlace'
import PizzaDetail from '../components/PizzaDetail'

class MainContainer extends Component {

state = {
  loggedIn: true,
  username: "",
  long: -73.987448000,
  lat: 40.700885000,
  pizzaplaces: [],
  users: [],
  addPizzaClicked: false,
  searchTerm: ""
}

componentDidMount(){
  fetch('http://localhost:3000/pizzaplaces')
  .then(res => res.json())
  .then(pizzaplaces => {
    this.setState({
      pizzaplaces: pizzaplaces
    })
  })
  .then(fetch('http://localhost:3000/users')
  .then( resp => resp.json())
  .then( users => {
    this.setState({
      users : users
    })
  })
 )
}

handleLoginButton = (name) => {
    if (name.length <= 0) {
        alert('Invalid Username')
      } else {
      this.state.users.forEach( user => {
        if (user.username === name) {
          this.setState({
            username: user.username,
            loggedIn: true
          })
        }
      })
    }
  }

handlePizzaClick = (event) => { //handle side pizza clicks
    this.setState({
      selectedPizzaPlace: event.name,
      clicked: true,
      lat: event.lat,
      lng: event.long
    })
}

handleChange = (event) => {
  event.preventDefault() // handle search form input
  const selectedPizzaPlace = this.state.pizzaplaces.filter(p =>
  p.name.toLowerCase().includes(event.target.value.toLowerCase()))
  this.setState({
    lat: selectedPizzaPlace[0].lat,
    long: selectedPizzaPlace[0].long,
    pizzaplaces: selectedPizzaPlace,
    searchTerm: event.target.value
    })
}

handleSearch = () => {
  window.location.reload()
  // const selectedPizzaPlace = this.state.pizzaplaces.filter(p =>
  // p.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
  // this.setState({
  //   lat: selectedPizzaPlace[0].lat,
  //   long: selectedPizzaPlace[0].long,
  //   pizzaplaces: selectedPizzaPlace
  //   })
}

handleNameInput = (event) => { // handle login input
  this.setState({
    [event.target.name]: event.target.value
  })
}

render() {
  return (
     <div style={{ textAlign: 'center', postition: 'center'}}>
       <h1>Welcome To Dollar Pizza Finder!</h1>
      {
        (this.state.loggedIn === false) ?
        <div >
          <Login LoginButton={this.handleLoginButton} handleNameInput={this.handleNameInput} /> # fix login position
        </div>
          :
          <div>
            <Search searchTerm={this.state.searchTerm} handleChange={this.handleChange} handleSearch={this.handleSearch}/>
            <GoogleMap searchTerm={this.state.searchTerm} long={this.state.long} pizzaplaces={this.state.pizzaplaces} chosenPizza={this.state.selectedPizzaPlace} lat={this.state.lat}/>
            <PizzaContainer pizzaplaces={this.state.pizzaplaces} handlePizzaClick={this.handlePizzaClick} />
          <br/>
          </div>
      }
  </div>
  );
}};

export default MainContainer;
