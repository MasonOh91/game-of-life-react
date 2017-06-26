/* @flow */
import React, { Component } from 'react';
import styles from 'components/App/App.scss';
import GameMenu from 'components/GameMenu/GameMenu';
import GameGrid from 'components/GameGrid/GameGrid';

import type { List } from 'immutable';

type AppProps = {
  cells: List<List<number>>,
  generation: number,
  cellsAlive: number,
  cellsDead: number,
  generationInMotion: boolean,
  initGridCells: (ket: string) => void,
  randomizeGridCells: () => void,
  stepGenerationAction: () => void
}

export default class App extends Component<void, AppProps, void> {
  constructor(props: AppProps) {
    super(props);

    (this: any).setGenerationInterval = (this: any).setGenerationInterval.bind(this);
    (this: any).clearGenerationInterval = (this: any).clearGenerationInterval.bind(this);
  }

  componentDidMount() {
    this.props.initGridCells('akitaExample');
  }

  setGenerationInterval() {
    this.intervalId = setInterval(() => {
      if (this.props.generationInMotion) {
        this.props.stepGenerationAction();
      }
    }, 50);
  }

  clearGenerationInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  intervalId: number;

  render() {
    return (
      <div className={styles.appContainer}>
        <GameMenu
          stepGenerationAction={this.props.stepGenerationAction}
          generation={this.props.generation}
          cellsAlive={this.props.cellsAlive}
          cellsDead={this.props.cellsDead}
          generationInMotion={this.props.generationInMotion}
          setGenerationInterval={this.setGenerationInterval}
        />
        <GameGrid
          randomizeGridCells={this.props.randomizeGridCells}
          initGridCells={this.props.initGridCells}
          cells={this.props.cells}
          generationInMotion={this.props.generationInMotion}
          clearGenerationInterval={this.clearGenerationInterval}
        />
      </div>
    );
  }
}
