import React from 'react'

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;


class NewPizzaPlace  extends React.Component{

state = {
    address: "",
    name: "",
    zipcode: undefined,
    long: 0,
    lat: 0,
}


handleChange = (event) => {
  this.setState({
      [event.target.name]: event.target.value
  })
}

handleSubmit = (event) => {
event.preventDefault();
  let resp = this.state.address.split(" ").join("+")

  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${resp}&key=${API_KEY}`)
  .then(resp => resp.json())
  .then(response => {
    fetch('http://localhost:3000/pizzaplaces', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        zipcode: this.state.zipcode,
        address: this.state.address,
        long: response.results[0].geometry.location.lng,
        lat: response.results[0].geometry.location.lat,
        })
      })
    })
    .then(this.props.cancelForm)
}


render(){
  return (
  <div>
    <h1>Share New Pizza Spot</h1>
      <form  onSubmit={this.handleSubmit}>
        <label>
          <input type="text" placeholder="Enter Name" value={this.state.name} onChange={this.handleChange} name="name" /><br/>
          <input type="number" placeholder="Enter ZipCode" value={this.state.zipcode} onChange={this.handleChange} name="zipcode" /><br/>
          <input type="text" placeholder="Enter Address" value={this.state.address} onChange={this.handleChange} name="address" /><br/>
        </label>
        <button type="submit" className='btn btn-success'>Submit</button>
        <button onClick={this.props.cancelForm}>Cancel</button>
      </form><br/>
  </div>
    )
  }
}

export default NewPizzaPlace;
