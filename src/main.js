/* @flow */
import '@blueprintjs/core/dist/blueprint.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from 'create';
import { FocusStyleManager } from '@blueprintjs/core';
import Routes from './routes';
import './styles/style.scss';

FocusStyleManager.onlyShowFocusOnTabs(); // im down with it, but remove this if we need acessibility
const store = createStore();

const GameOfLifeApp = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

ReactDOM.render(
  <GameOfLifeApp />
, document.getElementById('root'));
