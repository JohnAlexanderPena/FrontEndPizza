import React from 'react';

  const Search = (props) =>{

      const style = {
        left: "600px",
        display: "inline-block"
      }

      return (
        <form style={style}>
          <input type="text" value={props.searchTerm} onChange={props.handleChange} />
          <button onClick={props.handleSearch}>Search</button>
        </form>
      );
    }



export default Search;
