/* @flow */
import { combineReducers } from 'redux';
import game, {
  _getGridCells,
  _getGeneration,
  _getCellsAlive,
  _getCellsDead,
  _getGenerationInMotion
} from 'modules/Game';

import type GameStateRecord from 'records/GameRecords';

export type rootState = {
  game: GameStateRecord
};

/* Colocated Selectors for maintainability */
export const getGridCells = (state: rootState) => _getGridCells(state.game);
export const getGeneration = (state: rootState) => _getGeneration(state.game);
export const getCellsAlive = (state: rootState) => _getCellsAlive(state.game);
export const getCellsDead = (state: rootState) => _getCellsDead(state.game);
export const getGenerationInMotion = (state: rootState) => _getGenerationInMotion(state.game);

export default combineReducers({
  game,
});
