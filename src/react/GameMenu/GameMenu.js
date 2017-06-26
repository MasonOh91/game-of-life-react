/* @flow */
import React from 'react';
import styles from 'components/GameMenu/GameMenu.scss';

type GameMenuProps = {
  stepGenerationAction: () => void
}

export default (props: GameMenuProps) => (
  <div className={styles.gameMenuContainer}>
    <a role="button"
      className="pt-button"
      tabIndex="0"
      onClick={() => {
        props.stepGenerationAction();
      }}
    >
      Step Generation
    </a>

    <a role="button"
      className="pt-button"
      tabIndex="0"
      onClick={() => {
        setInterval(() => {
          props.stepGenerationAction();
        }, 50);
      }}
    >
      Live Life
    </a>
  </div>
);
