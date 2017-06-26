/* @flow */
/* eslint-disable no-useless-constructor */

import { Record, List } from 'immutable';
import { cellLayouts } from 'constants/cellConstants';

export class GameStatRecord extends Record({
  gridCells: cellLayouts.akitaExample,
  generation: 0,
  cellsAlive: 0,
  cellsDead: 0,
  generationInMotion: true
}) {
  gridCells: List<List<number>>;
  generation: number;
  cellsAlive: number;
  cellsDead: number;
  generationInMotion: boolean;
}

export default GameStatRecord;
