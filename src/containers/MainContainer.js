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
    loggedIn: false,
    username: "",
    long: -73.987448000,
    lat: 40.700885000,
    pizzaplaces: []
  }

  componentDidMount(){
    fetch('http://localhost:3000/pizzaplaces')
    .then(res => res.json())
    .then(pizzaplaces => {
      this.setState({
        pizzaplaces: pizzaplaces
      })
    })
  }

  handleLogin = (event) => {
    event.preventDefault()
    if(!this.state.loggedIn) {
      fetch('http://localhost:3000/users')
      .then(resp => resp.json())
      .then(users => {
        users.forEach(user => {
          if (user.username === this.state.username) {
            this.setState({
              loggedIn: true
              })
            }
          })
        })
      }}

      // handlePizzaClick = (event, pizzaplace) =>
      // {
      //   this.setState({
      //     selectedPizzaPlace: pizzaplace,
      //     clicked: true,
      //     lat: pizzaplace.lat,
      //     lng: pizzaplace.long,
      //   })
      // }

      //
      handleChange = (event) => {
        this.setState({
          searchTerm: event.target.value
        })
      }
      //
      //   event.preventDefault();
        // const desiredPizzaplaces = this.state.pizzaplaces.filter(p =>
        // p.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))

      //   if(desiredPizzaplaces !== this.state.searchTerm){
      //     return null
      //   } else {
      //   this.setState({
      //     long: desiredPizzaplaces[0].long,
      //     lat: desiredPizzaplaces[0].lat
      //     })
      //   }
      // }

  handleNameInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
       <div>
        {
          (this.state.loggedIn === false) ?
            <Login handleLogin={this.handleLogin} handleNameInput={this.handleNameInput} username={this.state.username}/>
            :
            <div>
            <Search searchTerm={this.state.searchTerm} handleChange={this.handleChange} handleSearch={this.handleSearch}/>
            <br/>
            <GoogleMap state={this.state}/>
            </div>
        }
    </div>
    );
  }

}

export default MainContainer;
