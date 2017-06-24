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
export const randomizeGridCells = createAction(GameActions.RANDOMIZE_GRID);
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

const randomizeBin = (min: number = 0, max: number = 1): number => (
  Math.floor(Math.random() * (max - min + 1)) + min
);

const randomCells = (state: GameState): List<List<number>> =>
    state.gridCells.withMutations((cells) => {
      let newCells;
      for (let i = 0; i < cells.size; i++) {
        newCells = cells.set(i, List());
        for (let j = 0; j < cells.size; j++) {
          newCells = cells.setIn([i, j], randomizeBin());
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

reducers[GameActions.RANDOMIZE_GRID] =
(state: GameState): GameState => (
  state.set('gridCells', randomCells(state))
);

export default handleActions(reducers, new GameState());
