import React, { Component } from 'react';
import MapContainer from './MapContainer'
import Login from '../components/Login'


class MainContainer extends Component {

  state = {
    loggedIn: false,
    username: "",
    long: -73.987448000,
    lat: 40.700885000,
  }

  handleLogin = () => {
    this.setState({
      loggedIn: !this.state.loggedIn
    })
  }

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
            <MapContainer state={this.state}/>


        }
    </div>
    );
  }

}

export default MainContainer;
