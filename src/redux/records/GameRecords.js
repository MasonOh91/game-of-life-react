/* @flow */
/* eslint-disable no-useless-constructor */

import { Record, List } from 'immutable';

export class GameStatRecord extends Record({
  gridSize: 1,
  gridCells: List([List([0])])
}) {
  gridSize: number;
  gridCells: List<List<number>>
}

export default GameStatRecord;
