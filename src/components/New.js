import React from 'react'

class New extends React.Component {

 state = {
   pizzaplace: "",
   address: ""
 }

handleClick = (event) => {
   this.setState({
   [event.target.name]: event.target.value
 })
}

handleSubmit = (event) => {
  console.log(event)
  event.preventDefault()
}

 render(){
   return (
  <form onSubmit={this.handleSubmit}>
    <div>
      <label htmlFor="username">Pizza Place Name:</label>
      <input type="text" name="pizzaplace" value={this.state.pizzaplace} onChange={this.handleClick} placeholder="Name of Pizza Place" />
    </div>
    <div>
      <label htmlFor="password">Pizza Place Address:</label>
      <input type="text" name="address" value={this.state.address} onChange={this.handleClick} placeholder="Address of Pizza Place" />
    </div>
    <input type="submit" value="Enter into database" />
  </form>
)}

}
export default New
