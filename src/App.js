import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import GamePage from "./GamePage";
import MainPage from "./MainPage";

export const App = () => {

  return (
    <Router>
      <Switch>
        <Route path="/game/:difficulty">
          <GamePage/>
        </Route>
        <Route path="/">
          <MainPage/>
        </Route>
      </Switch>
    </Router>
  )
};

export default App;

