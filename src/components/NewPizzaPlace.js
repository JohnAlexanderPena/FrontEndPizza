import React from 'react'

class NewPizzaPlace  extends React.Component{

state = {
    address: "",
    name: "",
    zipcode: undefined,
}


handleChange = (event) => {
  this.setState({
      [event.target.name]: event.target.value
  })
}

newHandleSubmit = (event) => {
  event.preventDefault()
  this.props.addhandleSubmit(event, this.state)
}

render(){
  return (
  <div>
    <h1>Share New Pizza Spot</h1>
      <form onSubmit={this.newHandleSubmit} >
        <label>
          <input type="text" placeholder="Enter Name" value={this.state.name} onChange={this.handleChange} name="name" /><br/>
          <input type="number" placeholder="Enter ZipCode" value={this.state.zipcode} onChange={this.handleChange} name="zipcode" /><br/>
          <input type="text" placeholder="Enter Address" value={this.state.address} onChange={this.handleChange} name="address" /><br/>
        </label>
        <button type="submit" className='btn btn-success'>Submit</button>
        <button onClick={this.props.addPizzaButton}>Cancel</button>
      </form><br/>
  </div>
    )
  }
}

export default NewPizzaPlace;
