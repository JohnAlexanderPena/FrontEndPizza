import React, { Component } from 'react';
// import MapContainer from './MapContainer'
import Login from '../components/Login'
import GoogleMap from './GoogleMap'
import Search from '../components/Search'
import PizzaContainer from './PizzaContainer'
import NewPizzaPlace from '../components/NewPizzaPlace'
import Reviews from '../components/Reviews'
// import Button from '@material-ui/core/Button';

// import PizzaDetail from '../components/PizzaDetail'

class MainContainer extends Component {

state = {
  loggedIn: false,
  user: "",
  long: -73.987448000,
  lat: 40.700885000,
  pizzaplaces: [],
  users: [],
  allReviews: [],
  showNewPizzaForm: false,
  searchTerm: "",
  viewDetailsClick: false,
  pizzaPlaceId: null,
  currentUser: null,
  pizzaPlaceReview: []
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
            currentUser: user,
            loggedIn: true
          })
        }
      })
    }
  }

  handleLoginSignUp = () => {
    this.setState({
      loggedIn: true
    })
  }

handlePizzaClick = (event) => { //handle side pizza clicks
  this.setState({
      selectedPizzaPlace: event.name,
      clicked: true,
      lat: event.lat,
      long: event.long,
    })
}

pushPizza = (response) => {
  console.log("HIT RESPONSE")
  this.setState({
    pizzaplaces: [...this.state.pizzaplaces, response],
    showNewPizzaForm: !this.state.showNewPizzaForm
  })
}

  viewAllPlaces = () => {
    this.setState({
      viewDetailsClick:!this.state.viewDetailsClick
    })
  }

viewDetailsClick = (pizzaplace) => {
  let reviews = []
  let allReviews = [...this.state.allReviews]
  if(pizzaplace.content) {
    this.setState({
      allReviews: [...this.state.allReviews, pizzaplace],
      viewDetailsClick: !this.state.viewDetailsClick,

    })
  }

  if(pizzaplace.address) {
    for (let reviewObj of allReviews) {
      for (let user of this.state.users) {
        if(user.id === reviewObj.user_id) {
          reviewObj.username = user.username
        }
      }
      if(reviewObj.pizzaplace_id === pizzaplace.id){
        reviews.push(reviewObj)
      }
    }
    this.setState({
      viewDetailsClick: !this.state.viewDetailsClick,
      pizzaPlaceReview: reviews,
      pizzaPlaceId: pizzaplace.id
    })
  }
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
      searchTerm: event.target.value.toLowerCase(),
      lat: place.lat,
      lng: place.long
    });
  }
  else {
    this.setState({
      pizzaplaces: originalPlaces,
      searchTerm: event.target.value.toLowerCase()
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
// const newArray = this.state.pizzaplaces.filter(pizzaplace => pizzaplace.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
// console.log(this.state.allReviews)
  return (
     <div style={{ textAlign: 'center', postition: 'center'}}>
       <h1>Welcome To Dollar Pizza Finder!</h1>
      {
        (this.state.loggedIn === false) ?
        <div >
          <Login LoginButton={this.handleLoginButton} handleLoginSignUp={this.handleLoginSignUp} handleNameInput={this.handleNameInput} />
        </div>
          :
          <div>
            { this.state.showNewPizzaForm ?
              <NewPizzaPlace pushPizza={this.pushPizza} cancelForm={this.addNewPizza}/>
              :
              <div><Search searchTerm={this.state.searchTerm} handleChange={this.handleChange} handleSearch={this.addNewPizza}/>
              <GoogleMap searchTerm={this.state.searchTerm} long={this.state.long} pizzaplaces={this.state.pizzaplaces} chosenPizza={this.state.selectedPizzaPlace} lat={this.state.lat}/>
            {
                this.state.viewDetailsClick ?
              <Reviews viewAllPlaces={this.viewAllPlaces} homePage={this.viewDetailsClick} user={this.state.currentUser}pizzaid={this.state.pizzaPlaceId} allUsers={this.state.users} pizzaplaces={this.state.pizzaplaces} reviews={this.state.pizzaPlaceReview}/>
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
