import React from 'react'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

import Button from '@material-ui/core/Button';





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
      .then(res => res.json())
        .then(response => {
          this.props.pushPizza(response)
         }
        )
    })
}


render(){
  console.log(this.state)
  return (
  <div>
    <h1 className="h3" >Share New Pizza Spot</h1>
      <FormControl>
       <InputLabel htmlFor="input-with-icon-adornment">Enter Name</InputLabel>
       <Input
         placeholder="eg. Pizza FEEN"
         value={this.state.name}
         onChange={this.handleChange}
         name="name"
         id="input-with-icon-adornment"
         startAdornment={
           <InputAdornment position="start">

           </InputAdornment>
         }
       />
     </FormControl><br/>
     <FormControl>
      <InputLabel type="number" htmlFor="input-with-icon-adornment">Zip Code</InputLabel>
      <Input
        placeholder="eg. 10001"
        value={this.state.zipcode}
        onChange={this.handleChange}
        name="zipcode"
        id="input-with-icon-adornment"
        startAdornment={
          <InputAdornment position="start">

          </InputAdornment>
        }
      />
  </FormControl><br/>
  <FormControl>
   <InputLabel htmlFor="input-with-icon-adornment">Enter Address</InputLabel>
   <Input
     placeholder="eg. 123 12th St., NY, NY"
     value={this.state.address}
     onChange={this.handleChange}
     name="address"
     id="input-with-icon-adornment"
     startAdornment={
       <InputAdornment position="start">

       </InputAdornment>
     }
   />
</FormControl><br/>
<Button onClick={this.handleSubmit} variant="contained" color= 'default'>
 Add New Pizza to Database!
</Button>
<br/>
<Button onClick={this.props.cancelForm} variant="contained" color= 'default'>
Cancel Form
</Button>
</div>
    )
  }
}

export default NewPizzaPlace;

// <FormControl>
//     <Input type="text" placeholder="Enter Name" value={this.state.name} onChange={this.handleChange} name="name" /><br/>
//     <Input type="number" placeholder="Enter ZipCode eg." value={this.state.zipcode} onChange={this.handleChange} name="zipcode" /><br/>
//     <Input type="text" placeholder="Enter Address" value={this.state.address} onChange={this.handleChange} name="address" /><br/>
//   <Button onSubmit={this.handleSubmit} variant="contained" color= 'default'>
//    Add New Pizza to Database
//  </Button><br/>
//  <Button onClick={this.props.cancelForm} variant="contained" color= 'default'>
//   Cancel Form
// </Button>
// </FormControl><br/>



 // <button onClick={this.props.cancelForm}>Cancel</button>
