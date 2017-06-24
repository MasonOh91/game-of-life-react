/* @flow */
import { handleActions, createAction } from 'redux-actions';
import GameState from 'records/GameRecords';
import { List } from 'immutable';

/**
 * Actions and Action Creators
 */
const GameActions = {
  SET_GRID_SIZE: 'game-of-life-react/game/set-grid-size',
  SET_GRID_CELLS: 'game-of-life-react/game/set-grid-cells'
};

export const setGridSize = createAction(GameActions.SET_GRID_SIZE,
  (height: number) => height);
export const setGridCells = createAction(GameActions.SET_GRID_CELLS,
  (width: List<List<number>>) => width);
/**
 * Selectors
 */
export const _getGridSize = (state: GameState): number => state.gridSize;
export const _getGridCells = (state: GameState): Array<Array<number>> => state.gridCells.toJS();

/**
 * Reducer helpers
 */
const recalculateGridSize = (size: number): List<List<number>> => List().withMutations((cells) => {
  let newCells;
  for (let i = 0; i < size; i++) {
    newCells = cells.set(i, List());
    for (let j = 0; j < size; j++) {
      newCells = cells.setIn([i, j], 0);
    }
  }
  return newCells;
});

/**
 * Reducers
 */
const reducers = {};

reducers[GameActions.SET_GRID_SIZE] =
(state: GameState, action: {payload: number}): GameState => (
  state.merge({
    gridSize: action.payload,
    gridCells: recalculateGridSize(action.payload)
  })
);

reducers[GameActions.SET_GRID_CELLS] =
(state: GameState, action: {payload: List<List<number>>}): GameState => (
  state.set('gridCells', action.payload)
);

export default handleActions(reducers, new GameState());
