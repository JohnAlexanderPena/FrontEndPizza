import React from 'react';
import Button from '@material-ui/core/Button';
;

const style = {
  left: "10px",
  display: "inline-block",
}


const Search = (props) => {

      return (
        <form  style={style}>
          <input type="text" onChange={(event)=> props.handleChange(event)}  placeholder="Search for Dollar Pizzas"/>
          <br/>
            <Button onClick={props.handleSearch} variant="contained" color= 'primary'>
              Add New Pizza to Database
            </Button>
        </form>
      );
    }



export default Search;
