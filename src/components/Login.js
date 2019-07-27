import React from 'react';

class Login extends React.Component {


    render(){
      const style = {
        left: "600px",
        position: "absolute",
        display: "inline-block",
      }

    return (
      <div style={style}>
      <h1>Welcome! Please Sign In</h1>
    <form action="">
      <input onChange={this.props.handleNameInput} name="username" type="text" value={this.props.username} placeholder="Enter Username"/><br/>
      <button onClick={this.props.handleLogin}>Login</button>
    </form>
</div>

    );
    }
}

export default Login;
