import React from 'react'
import Pizza from '../components/Pizza'
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import { FixedSizeList } from 'react-window';

const useStyles = makeStyles(theme => ({
  root: {
    float:"right",
    width: '49%',
    height: '50%',
    background: '#0130A0',
    backgroundColor: '#bbdefb',
  },
}));

// function Row(props) {
//   const { index, style } = props;
//
//   return (
//     <ListItem button style={style} key={index}>
//       <ListItemText primary={`Item ${index + 1}`} />
//     </ListItem>
//   );
// }
//
// Row.propTypes = {
//   index: PropTypes.number.isRequired,
//   style: PropTypes.object.isRequired,
// };

export default function PizzaContainer(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        {props.pizzaplaces.map((pizzaplace, index) => {
          return <ListItem button key={index + pizzaplace}>
          <ListItemText onClick={(event) => props.handlePizzaClick(pizzaplace) } primary={`${pizzaplace.name} located at:  ${pizzaplace.address}`} />
        </ListItem> })}
    </div>
  );
}

  //
  //   return(
  //     props.pizzaplaces.map(pizzaplace => {
  //       return <Pizza pizzaplace={pizzaplace} key={pizzaplace.id} handlePizzaClick={this.props.handlePizzaClick}/>
  //     })
  //   )
  // }

// export default PizzaContainer
