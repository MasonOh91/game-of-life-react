/* @flow */
import { handleActions, createAction } from 'redux-actions';
import GameState from 'records/GameRecords';
import { List } from 'immutable';
import { cellLayouts } from 'constants/cellConstants';

/**
 * Actions and Action Creators
 */
const GameActions = {
  INIT_GRID_CELLS: 'game-of-life-react/game/set-grid-cells',
  RANDOMIZE_GRID: 'game-of-life-react/game/randomize-grid',
  STEP_GENERATION: 'game-of-life-react/game/step-generation'
};

export const setGridCells = createAction(GameActions.INIT_GRID_CELLS,
  (width: List<List<number>>) => width);
export const initGridCells = createAction(GameActions.INIT_GRID_CELLS);
export const randomizeGridCells = createAction(GameActions.RANDOMIZE_GRID);
export const stepGenerationAction = createAction(GameActions.STEP_GENERATION);

/**
 * Selectors
 */
export const _getGridCells = (state: GameState): List<List<number>> => state.gridCells;

/**
 * Reducer helpers
 */
const randomizeBin = (min: number = 0, max: number = 1): number => (
  Math.floor(Math.random() * (max - min + 1)) + min
);

const randomCells = (size: number): List<List<number>> =>
    List().withMutations((cells) => {
      let newCells;
      for (let i = 0; i < size; i++) {
        newCells = cells.set(i, List());
        for (let j = 0; j < size; j++) {
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

const stepGeneration = (state: GameState) => List().withMutations((newCells) => {
  state.gridCells.forEach((row: List<number>, i: number) => {
    const upperrow = (i - 1);
    const rowbelow = (i + 1) >= state.gridCells.size ? -1 : (i + 1);
    row.forEach((newCell, j: number) => {
      const leftcol = (j - 1);
      const rightcol = (j + 1) >= state.gridCells.size ? -1 : (j + 1);
      const neighborz = {
        topleft: calcNeighbor(state.gridCells, upperrow, leftcol),
        top: calcNeighbor(state.gridCells, upperrow, j),
        topright: calcNeighbor(state.gridCells, upperrow, rightcol),
        left: calcNeighbor(state.gridCells, i, leftcol),
        right: calcNeighbor(state.gridCells, i, rightcol),
        bottomleft: calcNeighbor(state.gridCells, rowbelow, leftcol),
        bottom: calcNeighbor(state.gridCells, rowbelow, j),
        bottomright: calcNeighbor(state.gridCells, rowbelow, rightcol)
      };
      let liveneighborz = 0;
      Object.values(neighborz).forEach((neighbor: any) => {
        liveneighborz += neighbor;
      });
      // update live cell
      if (state.gridCells.getIn([i, j]) === 1) {
        if (liveneighborz < 2 || liveneighborz > 3) {
          newCells = newCells.setIn([i, j], 0);
        } else {
          newCells = newCells.setIn([i, j], 1);
        }
      } else if (state.gridCells.getIn([i, j]) === 0) {
        if (liveneighborz === 3) {
          newCells = newCells.setIn([i, j], 1);
        } else {
          newCells = newCells.setIn([i, j], 0);
        }
      }
    });
  });
});

/**
 * Reducers
 */
const reducers = {};

reducers[GameActions.INIT_GRID_CELLS] =
(state: GameState, action: {payload: string}): GameState => (
  state.merge({
    gridCells: cellLayouts[action.payload]
  })
);

reducers[GameActions.RANDOMIZE_GRID] =
(state: GameState, action: {payload: number}): GameState => state.merge({
  gridCells: randomCells(action.payload)
});

reducers[GameActions.STEP_GENERATION] = (state: GameState): GameState => (
  state.set('gridCells', stepGeneration(state))
);

export default handleActions(reducers, new GameState());
