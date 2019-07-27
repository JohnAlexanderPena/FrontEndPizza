import React from 'react'
import Pizza from '../components/Pizza'

class PizzaContainer extends React.Component{

  state = {
    clicked: true
  }

  render(){
    return(
      this.props.pizzaplaces.map(pizzaplace => {
        return <Pizza pizzaplace={pizzaplace} key={pizzaplace.id} handlePizzaClick={this.props.handlePizzaClick}/>
      })
    )
  }
}

export default PizzaContainer
