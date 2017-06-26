/* @flow */
/* eslint-disable no-useless-constructor */

import { Record, List } from 'immutable';
import { cellLayouts } from 'constants/cellConstants';

export class GameStatRecord extends Record({
  gridCells: cellLayouts.akitaExample
}) {
  gridCells: List<List<number>>
}

export default GameStatRecord;
