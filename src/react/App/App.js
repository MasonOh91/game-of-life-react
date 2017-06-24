/* @flow */
import React, { Component } from 'react';
import styles from 'components/App/App.scss';
import GameMenu from 'components/GameMenu/GameMenu';
import GameGrid from 'components/GameGrid/GameGrid';

type AppProps = {
  cellsPerRow: number,
  cells: Array<Array<number>>,
  setGridSize: (size: number) => void,
  initGridCells: () => void,
  randomizeGridCells: () => void
}

export default class App extends Component<void, AppProps, void> {
  constructor(props: AppProps) {
    super(props);
  }

  componentDidMount() {
    this.props.initGridCells();
  }

  render() {
    return (
      <div className={styles.appContainer}>
        <GameMenu {...this.props} />
        <GameGrid cells={this.props.cells}
          cellWidth={this.props.cellsPerRow}
        />
      </div>
    );
  }
}
