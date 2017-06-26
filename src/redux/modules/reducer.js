/* @flow */
import { combineReducers } from 'redux';
import game, {
  _getGridCells
} from 'modules/Game';

import type GameStateRecord from 'records/GameRecords';

export type rootState = {
  game: GameStateRecord
};

/* Colocated Selectors for maintainability */
export const getGridCells = (state: rootState) => _getGridCells(state.game);

export default combineReducers({
  game,
});
