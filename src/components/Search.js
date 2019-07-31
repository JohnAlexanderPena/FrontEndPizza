import React from 'react';

  const Search = (props) =>{

      const style = {
        left: "600px",
        display: "inline-block"
      }

      return (
        <form style={style}>
          <input type="text" placeholder="Search for Dollar Pizzas" value={props.searchTerm} onChange={props.handleChange} />
        </form>
      );
    }



export default Search;
