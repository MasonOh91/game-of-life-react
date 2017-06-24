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
export const stepGenerationAction = createAction(GameActions.STEP_GENERATION);
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

const calcNeighbor = (cells: List<List<number>>, row: number, col: number) => {
  if (row < 0 || col < 0) {
    return 0;
  }
  return cells.getIn([row, col]);
};

const stepGeneration = (state: GameState) => state.gridCells.withMutations((newCells) => {
  newCells.forEach((row: List<number>, i: number) => {
    debugger;
    const upperrow = (i - 1);
    const rowbelow = (i + 1) >= state.gridSize ? -1 : (i + 1);
    row.forEach((newCell, j: number) => {
      const leftcol = (j - 1);
      const rightcol = (j + 1) >= state.gridSize ? -1 : (j + 1);
      const neighborz = {
        topleft: calcNeighbor(newCells, upperrow, leftcol),
        top: calcNeighbor(newCells, upperrow, j),
        topright: calcNeighbor(newCells, upperrow, rightcol),
        left: calcNeighbor(newCells, i, leftcol),
        right: calcNeighbor(newCells, i, rightcol),
        bottomleft: calcNeighbor(newCells, rowbelow, leftcol),
        bottom: calcNeighbor(newCells, rowbelow, j),
        bottomright: calcNeighbor(newCells, rowbelow, rightcol)
      };
      let liveneighborz = 0;
      Object.values(neighborz).forEach((neighbor) => {
        liveneighborz += neighbor;
      });
        // update live cell
      if (state.gridCells.getIn([i, j]) === 1) {
        if (liveneighborz < 2 || liveneighborz > 3) {
          newCells = newCells.setIn([i, j], 0); //dies
        } else {
          newCells = newCells.setIn([i, j], 1); //lives
        }
      } else if (state.gridCells.getIn([i, j]) === 0) {
        if (liveneighborz === 3) {
          newCells = newCells.setIn([i, j], 1); //repros
        } else {
          newCells = newCells.setIn([i, j], 0); //stays dead
        }
      }
    });
  });
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

reducers[GameActions.STEP_GENERATION] = (state: GameState): GameState => (
  state.set('gridCells', stepGeneration(state))
);

export default handleActions(reducers, new GameState());
