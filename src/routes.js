import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppContainer from 'components/App/AppContainer';

const Routes = () => (
  <Router>
    <Route path="/" component={AppContainer} />
  </Router>
);

export default Routes;
