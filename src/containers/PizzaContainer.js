import React from 'react'
// import Pizza from '../components/Pizza'
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


export default function PizzaContainer(props) {
const classes = useStyles();
const selectedPizzaPlace = props.pizzaplaces.filter(p =>
    p.name.toLowerCase().includes(props.searchTerm));

  return (
    <div className={classes.root}>
        {selectedPizzaPlace.map((pizzaplace, index) => {
          return <ListItem button key={index + pizzaplace}>
          <ListItemText onClick={(event) => props.handlePizzaClick(pizzaplace) } primary={`${pizzaplace.name} located at:  ${pizzaplace.address}`} />
        </ListItem> })}
    </div>
  );
}
