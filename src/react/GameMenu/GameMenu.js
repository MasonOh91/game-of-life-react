/* @flow */
import React from 'react';
import styles from 'components/GameMenu/GameMenu.scss';

type GameMenuProps = {
  cellsPerRow: number,
  setGridSize: (size: number) => void,
  randomizeGridCells: () => void
}

export default (props: GameMenuProps) => (
  <div className={styles.gameMenuContainer}>
    <label className="pt-label pt-inline" htmlFor="cell-row-input">
      Grid Size:
      <input className="pt-input"
        value={props.cellsPerRow}
        onChange={(e: any) => {
          props.setGridSize(parseInt((e.target.value || 0), 10));
        }}
        id="cell-row-input"
        style={{ width: '200px' }}
        type="text"
        placeholder="Text input"
        dir="auto"
      />
    </label>

    <a role="button"
      className="pt-button pt-intent-primary"
      tabIndex="0"
      onClick={() => {
        props.randomizeGridCells();
      }}
    >
      Randomize Cells
    </a>
  </div>
);
