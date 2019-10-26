import React, { Component } from 'react';
// import MapContainer from './MapContainer'
import Login from '../components/Login'
import GoogleMap from './GoogleMap'
import Search from '../components/Search'
import PizzaContainer from './PizzaContainer'
import NewPizzaPlace from '../components/NewPizzaPlace'
import Reviews from '../components/Reviews'
import Button from '@material-ui/core/Button';

// import PizzaDetail from '../components/PizzaDetail'

class MainContainer extends Component {

state = {
  loggedIn: true,
  username: "",
  long: -73.987448000,
  lat: 40.700885000,
  pizzaplaces: [],
  users: [],
  allReviews: [],
  showNewPizzaForm: false,
  searchTerm: "",
  viewDetailsClick: false
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
 .then(fetch('http://localhost:3000/reviews')
  .then( resp => resp.json())
  .then( reviews => {
    this.setState({
      allReviews: reviews
    })
    })
  );
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
      long: event.long,
    })
}

viewDetailsClick = (pizzaplace) => {
  let reviews = []
  for (let placeId of this.state.allReviews) {
    for (let user of this.state.users) {
      if(user.id === placeId.user_id) {
        placeId.username = user.username
      }
    }
    if(placeId.pizzaplace_id === pizzaplace.id){
      reviews.push(placeId)
    }
  }
  this.setState({
    viewDetailsClick: !this.state.viewDetailsClick,
    allReviews: reviews
  })
};

handleChange = (event) => {
event.preventDefault() // handle search form input

const originalPlaces = [...this.state.pizzaplaces]
let newPlace = this.state.pizzaplaces.filter(pizzaplace => pizzaplace.name.toLowerCase().includes(event.target.value.toLowerCase()))
if(newPlace[0] === undefined){
  return null
} else {
for(let place of this.state.pizzaplaces) {
  if (place.name.includes(newPlace[0].name)) {
    this.setState({
      pizzaplaces: [place],
      searchTerm: event.target.value,
      lat: place.lat,
      lng: place.long
    });
  }
  else {
    this.setState({
      pizzaplaces: originalPlaces,
      searchTerm: event.target.value
        })
      }
    };
  }
}

addNewPizza = () => {
  this.setState({
    showNewPizzaForm: !this.state.showNewPizzaForm,
    pizzaplaces: this.state.pizzaplaces
  })
}

handleNameInput = (event) => { // handle login input
  this.setState({
    [event.target.name]: event.target.value
  })
}

render() {
const newArray = this.state.pizzaplaces.filter(pizzaplace => pizzaplace.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
console.log(this.state.allReviews, this.state.users)
  return (
     <div style={{ textAlign: 'center', postition: 'center'}}>
       <h1>Welcome To Dollar Pizza Finder!</h1>
      {
        (this.state.loggedIn === false) ?
        <div >
          <Login LoginButton={this.handleLoginButton} handleNameInput={this.handleNameInput} />
        </div>
          :
          <div>
            { this.state.showNewPizzaForm ?
              <NewPizzaPlace cancelForm={this.addNewPizza}/>
              :
              <div><Search searchTerm={this.state.searchTerm} handleChange={this.handleChange} handleSearch={this.addNewPizza}/>
              <GoogleMap searchTerm={this.state.searchTerm} long={this.state.long} pizzaplaces={this.state.pizzaplaces} chosenPizza={this.state.selectedPizzaPlace} lat={this.state.lat}/>
            {
                this.state.viewDetailsClick ?
              <Reviews user={this.state.username} pizzaplaces={this.state.pizzaplaces} reviews={this.state.allReviews}/>
              :
              <PizzaContainer viewDetailsClick={this.viewDetailsClick} searchTerm={this.state.searchTerm} pizzaplaces={this.state.pizzaplaces} handlePizzaClick={this.handlePizzaClick} />
            }
              </div>
            }
          </div>
      }
  </div>
  );
}};

export default MainContainer;
