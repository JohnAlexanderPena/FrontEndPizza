import React from 'react';
import Button from '@material-ui/core/Button';

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
;

const style = {
  left: "10px",
  display: "inline-block",
}


const Search = (props) => {

      return (
        <FormControl >
          <h2 className="h3"><span>{"SearchHere!----->"}<Input
            onChange={(event)=> props.handleChange(event)}  placeholder="Search for Dollar Pizzas"
            />{"<-----SearchHere!"}</span></h2>
          <Button onClick={props.handleSearch} variant="contained" color= 'default'>
              Add New Pizza to Database
            </Button>
        </FormControl>
      );
    }



export default Search;
// <form  style={style}>
//   <input type="text" onChange={(event)=> props.handleChange(event)}  placeholder="Search for Dollar Pizzas"/>
//   <br/>
//   <Button onClick={props.handleSearch} variant="contained" color= 'primary'>
//     Add New Pizza to Database
//   </Button>
// </form>
