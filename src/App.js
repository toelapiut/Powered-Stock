import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Stock from './containers/Stock';

const App = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/stock">Public Company</Link>
          </li>
        </ul>

        <hr/>

        <Switch>
          <Route exact path="*">
            <Stock/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

