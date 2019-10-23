import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
// import TextField from '@material-ui/core/TextField';
// import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';


 class Login extends React.Component {

   state = {
     username: '',
     registerName: ''
   }

   setUsername = event => {
      this.setState({
          username: event.target.value
        })
      };

  setRegisterName = event => {
         this.setState({
             registerName: event.target.value
           })
         };

  handleSignUp = () => {
    if(this.state.registerName.length <= 1 || this.state.registerName.length > 20) {
      alert('Please enter a username between 2 - 20 charaters')
    } else {
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.registerName
      })
    })
    .then(res => res.json())
    .then(resp => {
      if(resp.errors) {
        alert(resp.errors)
      } else {
        alert('Succesfully registered!')
        }
      })
    }
  }

render() {
  console.log(this.state.username)
  return (
    <div>
      <FormControl >
        <Input
          onChange={this.setUsername}
          placeholder="Enter Username"
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
      <br/>
      <br/>
      <Button onClick={() => this.props.LoginButton(this.state.username)}variant="contained" color= 'primary'>
        Login
      </Button>
      <br/>
      <FormControl >
        <Input
          onChange= {this.setRegisterName}
          id="input-with-icon-adornment"
          placeholder="Enter New Username"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
      <br/>
      <br/>
      <Button onClick={this.handleSignUp}variant="contained" color="primary">
        Register
      </Button>
    <div >
      </div>
    </div>
    );
  }

}

export default Login
