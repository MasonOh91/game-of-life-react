/* @flow */
/* eslint-disable no-useless-constructor */

import { Record, List } from 'immutable';

export class GameStatRecord extends Record({
  gridSize: 5,
  gridCells: List([
    List([0, 1, 0, 0, 0]),
    List([1, 0, 0, 1, 1]),
    List([1, 1, 0, 0, 1]),
    List([0, 1, 0, 0, 0]),
    List([1, 0, 0, 0, 1])
  ])
}) {
  gridSize: number;
  gridCells: List<List<number>>
}

export default GameStatRecord;

/**
 * List([
   List([0, 1, 0, 0, 0]),
   List([1, 0, 0, 1, 1]),
   List([1, 1, 0, 0, 1]),
   List([0, 1, 0, 0, 0]),
   List([1, 0, 0, 0, 1])
 ])
 */
