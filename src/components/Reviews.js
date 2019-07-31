import React from 'react'
import NewReview from './NewReview'

class Reviews extends React.Component {

  state = {
    pizzaplace: this.props.pizzaplace,
    review: this.props.review.content,
    id: this.props.review.id,
    newReview: ""
  }



  handleClick = (event) => {
    this.setState({
    [event.target.name]: event.target.value
  })
  }


  handleSubmit = (event) => {
    event.preventDefault()
    fetch(`http://localhost:3000/reviews/${this.state.id}`, {
      method: "PATCH",
      headers: {
        "Accept":"application/json",
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        content: this.state.review
      })
    })
    .then(fetch('http://localhost:3000/reviews')
    .then(res => res.json())
    .then(reviews => {
      this.setState({
        reviews: reviews
      })
    }))
  }



  render(){
    return(
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="review"></label>
            <textarea type="text" name="review" value={this.state.review} onChange={this.handleClick} placeholder={this.state.review} /><br/>
          </div><br/>
          <input type="submit" value="Edit review" />
          <button value="Back to list" onClick={this.props.handleReviewEdit}>Back to Pizza Place List</button><br/>

        </form>
        <button value="Remove Review" onClick={ (event) => this.props.removeReview(event, this.props.review)} >Delete Review</button>

      </React.Fragment>
  )
  }
}
export default Reviews
