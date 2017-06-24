/* @flow */
import { handleActions, createAction } from 'redux-actions';
import GameState from 'records/GameRecords';
import { List } from 'immutable';

/**
 * Actions and Action Creators
 */
const GameActions = {
  SET_GRID_SIZE: 'game-of-life-react/game/set-grid-size',
  INIT_GRID_CELLS: 'game-of-life-react/game/set-grid-cells',
  RANDOMIZE_GRID: 'game-of-life-react/game/randomize-grid',
  STEP_GENERATION: 'game-of-life-react/game/step-generation'
};

export const setGridSize = createAction(GameActions.SET_GRID_SIZE,
  (height: number) => height);
export const setGridCells = createAction(GameActions.INIT_GRID_CELLS,
  (width: List<List<number>>) => width);
export const initGridCells = createAction(GameActions.INIT_GRID_CELLS);
/**
 * Selectors
 */
export const _getGridSize = (state: GameState): number => state.gridSize;
export const _getGridCells = (state: GameState): Array<Array<number>> => state.gridCells.toJS();

/**
 * Reducer helpers
 */
const recalculateGridSize = (size: number): List<List<number>> =>
   List().withMutations((cells) => {
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

reducers[GameActions.INIT_GRID_CELLS] =
(state: GameState): GameState => (
  state.set('gridCells', recalculateGridSize(state.gridSize))
);

export default handleActions(reducers, new GameState());
