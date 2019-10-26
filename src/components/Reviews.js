import React, { Fragment } from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import '../../src/App.css';
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const ranges = [
  {
    value: "1",
    label: "1"
  },
  {
    value: "2",
    label: "2"
  },
  {
    value: "3",
    label: "3"
  },
  {
    value: "4",
    label: "4"
  },
  {
    value: "5",
    label: "5"
  }
];



class Reviews extends React.Component {

  state = {
    pizzaplace: this.props.pizzaplaces,
    clickedAddReview: false,
    rating: "",
    newReview: ""
  }

  addReview = () => {
    this.setState({
      clickedAddReview: !this.state.clickedAddReview
    })
  }


  handleClick = (event) => {
    this.setState({
    [event.target.name]: event.target.value
  })
  }

  submitReview = (event) => {
    event.preventDefault()
    console.log("YURRR")
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
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
  console.log(this.state.rating, this.state.newReview)
 return (
   <List style={{ width: '49%', float: 'right' }} className={"nothing"}>
     { this.state.clickedAddReview ? <h1>HELLO</h1> :
       this.props.reviews.map(review => {
         return <ListItem key={review.id} alignItems="flex-start">
          <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://cdn.dribbble.com/users/39185/screenshots/2741760/pi2zza.jpg" />
          </ListItemAvatar>
          <ListItemText primary={
                   <Box component="fieldset" mb={3} borderColor="transparent">
                   <Rating value={review.rating} readOnly />
                   </Box>
                   }
                        secondary={
                          <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={"nthing"}
                            color="textPrimary"
                            >
                           {`${review.username}`}
                          </Typography>
                          {` - ${review.content}`}
                          </React.Fragment>
                        }
                        />
          </ListItem>
        }
      )}

      {this.state.clickedAddReview ?
  <div>
        <TextField
   select
   name={"rating"}
   onChange={(event) => this.handleChange(event)}
   InputProps={{
     startAdornment: (
       <InputAdornment position="start">Rating</InputAdornment>
     )
   }}
 >
   {ranges.map(option => (
     <MenuItem key={option.value} value={option.value}>
       {option.label}
     </MenuItem>
   ))}
 </TextField>
 <FormControl fullWidth >
   <InputLabel>Leave Review Here</InputLabel>
   <Input
     name={"newReview"}
     onChange={(event) => this.handleChange(event)}
     startAdornment={<InputAdornment position="start"></InputAdornment>}
   />
 </FormControl>
</div>
 :

              this.props.reviews.length === 0 ?
                <Button style={{ float: 'right' }} onClick={this.addReview}variant="contained" color="primary">
                  Be the first to review this place!
                </Button> :
                <Button style={{ float: 'right' }} onClick={this.addReview}variant="contained" color="primary">
                  Add Review
                </Button>

      }

      <Divider variant="inset" component="li" />
    </List>
  );
}}

export default Reviews;
