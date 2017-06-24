/* @flow */
import React from 'react';
import styles from 'components/App/App.scss';
import GameMenu from 'components/GameMenu/GameMenu';
import GameGrid from 'components/GameGrid/GameGrid';

type AppProps = {
  cellsPerRow: number,
  cells: Array<Array<number>>,
  setGridSize: (size: number) => void,
}

export default (props: AppProps) => (
  <div className={styles.appContainer}>
    <GameMenu {...props} />
    <GameGrid cells={props.cells}
      cellWidth={props.cellsPerRow}
    />
  </div>
);
