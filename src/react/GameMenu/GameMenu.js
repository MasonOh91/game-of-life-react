/* @flow */
import React from 'react';
import styles from 'components/GameMenu/GameMenu.scss';

type GameMenuProps = {
  stepGenerationAction: () => void,
  generation: number,
  cellsAlive: number,
  cellsDead: number,
  generationInMotion: boolean,
  setGenerationInterval: () => void
}

export default (props: GameMenuProps) => (
  <div className={styles.gameMenuContainer}>

    <div className={styles.statusBox}>
      <p>Generation Info</p>
      <p>Generation: {props.generation}</p>
      <p>Alive: {props.cellsAlive}</p>
      <p>Dead: {props.cellsDead}</p>
    </div>
    <a role="button"
      className="pt-button"
      tabIndex="0"
      onClick={() => {
        if (props.generationInMotion) {
          props.stepGenerationAction();
        }
      }}
    >
      Step Generation
    </a>

    <a role="button"
      className="pt-button"
      tabIndex="0"
      onClick={() => {
        props.setGenerationInterval();
      }}
    >
      Live Life!
    </a>
  </div>
);
