import React from 'react';

class Pizza extends React.Component{

state = {
  clicked: true
}

handleClick = (event) => {
  this.props.handlePizzaClick(event, this.props.pizzaplace)
}

render(){

  return (
     <div onClick={this.handleClick}>
      <ul >
        <li>{this.props.pizzaplace.name}</li>
        <li>{this.props.pizzaplace.address}</li>
      </ul>
     </div>

  )
}

}

export default Pizza
