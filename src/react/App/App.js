/* @flow */
import React, { Component } from 'react';
import styles from 'components/App/App.scss';
import GameMenu from 'components/GameMenu/GameMenu';
import GameGrid from 'components/GameGrid/GameGrid';

import type { List } from 'immutable';

type AppProps = {
  cells: List<List<number>>,
  initGridCells: (ket: string) => void,
  randomizeGridCells: () => void,
  stepGenerationAction: () => void
}

export default class App extends Component<void, AppProps, void> {
  constructor(props: AppProps) {
    super(props);
  }

  componentDidMount() {
    this.props.initGridCells('akitaExample');
  }

  render() {
    return (
      <div className={styles.appContainer}>
        <GameMenu
          stepGenerationAction={this.props.stepGenerationAction}
        />
        <GameGrid
          randomizeGridCells={this.props.randomizeGridCells}
          initGridCells={this.props.initGridCells}
          cells={this.props.cells}
        />
      </div>
    );
  }
}
