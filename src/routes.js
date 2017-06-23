import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GameGrid from 'components/GameGrid/GameGrid';

const Routes = () => (
  <Router>
    <Route path="/" component={GameGrid} />
  </Router>
);

export default Routes;
