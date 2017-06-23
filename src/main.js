/* @flow */
import '@blueprintjs/core/dist/blueprint.css';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createStore from 'create';
import { FocusStyleManager } from '@blueprintjs/core';
import Routes from './routes.js';

FocusStyleManager.onlyShowFocusOnTabs(); // im down with it, but remove this if we need acessibility
const store = createStore();

type Props = {};
export default class GameOfLifeApp extends Component<void, Props, void> {
  static displayName = 'GameOfLifeApp';
  render() {
    debugger;
    return (
      <div>
        hello
      </div>
    );
  }
}

ReactDOM.render(
  <GameOfLifeApp />
, document.getElementById('root'));
