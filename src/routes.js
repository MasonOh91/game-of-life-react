import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { GameGrid } from 'components/GameGrid/GameGrid'

class Routes extends Component {
  render() {
    return (
      <Router>
        <Route path='/' component={GameGrid} />
      </Router>
    );
  }
}

export default Routes;
