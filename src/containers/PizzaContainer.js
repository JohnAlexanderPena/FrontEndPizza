import React from 'react'
// import Pizza from '../components/Pizza'
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import { FixedSizeList } from 'react-window';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    float:"right",
    width: '49%',
    height: '50%',
    background: '#C38D9E',
    backgroundColor: '#E8A87C',
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
            <Button onClick={() => props.viewDetailsClick(pizzaplace) }
              color="primary" aria-label="outlined primary button group">
              View Reviews
            </Button>
        </ListItem> })}
    </div>


  );
}
