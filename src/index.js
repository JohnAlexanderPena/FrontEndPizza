import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import New from './components/New'

ReactDOM.render((
    <Router>
      <React.Fragment>
        <Route exact path="/new" component={New} />
        <Route exact path="/" component={App} />
      </React.Fragment>
    </Router>),
    document.getElementById('root')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
