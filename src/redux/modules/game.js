/* @flow */
import { handleActions, createAction } from 'redux-actions';
import GameState from 'records/GameRecords';
import { List } from 'immutable';
import { cellLayouts } from 'constants/cellConstants';

type GridDataPayload = {
  cells: List<List<number>>,
  generation: number,
  cellsAlive: number,
  cellsDead: number,
  generationInMotion: boolean
};

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
export const _getGeneration = (state: GameState): number => state.generation;
export const _getCellsAlive = (state: GameState): number => state.cellsAlive;
export const _getCellsDead = (state: GameState): number => state.cellsDead;
export const _getGenerationInMotion = (state: GameState): boolean => state.generationInMotion;

/**
 * Reducer helpers
 */
const randomizeBin = (min: number = 0, max: number = 1): number => (
  Math.floor(Math.random() * (max - min + 1)) + min
);

const randomCells = (size: number): GridDataPayload => {
  let alive = 0;
  let dead = 0;
  const newCells = List().withMutations((cells) => {
    for (let i = 0; i < size; i++) {
      cells = cells.set(i, List());
      for (let j = 0; j < size; j++) {
        const randomBin = randomizeBin();
        if (randomBin === 0) {
          dead++;
        } else {
          alive++;
        }
        cells = cells.setIn([i, j], randomBin);
      }
    }
  });
  return {
    cells: newCells,
    generation: 0,
    cellsAlive: alive,
    cellsDead: dead,
    generationInMotion: alive !== 0
  };
};

const calcNeighbor = (cells: List<List<number>>, row: number, col: number) => {
  if (row < 0 || col < 0) {
    return 0;
  }
  return cells.getIn([row, col]);
};

const stepGeneration = (state: GameState) => {
  let alive = 0;
  let dead = 0;
  const nextGenCells = List().withMutations((newCells) => {
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
          alive++;
          if (liveneighborz < 2 || liveneighborz > 3) {
            newCells = newCells.setIn([i, j], 0);
          } else {
            newCells = newCells.setIn([i, j], 1);
          }
        } else if (state.gridCells.getIn([i, j]) === 0) {
          dead++;
          if (liveneighborz === 3) {
            newCells = newCells.setIn([i, j], 1);
          } else {
            newCells = newCells.setIn([i, j], 0);
          }
        }
      });
    });
  });

  return {
    cells: nextGenCells,
    generation: state.generation + 1,
    cellsAlive: alive,
    cellsDead: dead,
    generationInMotion: alive !== 0
  };
};

/**
 * Reducers
 */
const reducers = {};

reducers[GameActions.INIT_GRID_CELLS] =
(state: GameState, action: {payload: string}): GameState => (
  state.merge({
    gridCells: cellLayouts[action.payload].cells,
    generation: cellLayouts[action.payload].generation,
    cellsAlive: cellLayouts[action.payload].cellsAlive,
    cellsDead: cellLayouts[action.payload].cellsDead,
    generationInMotion: true
  })
);

reducers[GameActions.RANDOMIZE_GRID] =
(state: GameState, action: {payload: number}): GameState => {
  const newGameInfo = randomCells(action.payload);
  return state.merge({
    gridCells: newGameInfo.cells,
    generation: newGameInfo.generation,
    cellsAlive: newGameInfo.cellsAlive,
    cellsDead: newGameInfo.cellsDead,
    generationInMotion: newGameInfo.generationInMotion
  });
};

reducers[GameActions.STEP_GENERATION] = (state: GameState): GameState => {
  const newGameInfo = stepGeneration(state);
  return state.merge({
    gridCells: newGameInfo.cells,
    generation: newGameInfo.generation,
    cellsAlive: newGameInfo.cellsAlive,
    cellsDead: newGameInfo.cellsDead,
    generationInMotion: newGameInfo.generationInMotion
  });
};

export default handleActions(reducers, new GameState());
