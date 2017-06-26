/* @flow */
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getGridCells,
  getGeneration,
  getCellsAlive,
  getCellsDead,
  getGenerationInMotion
 } from 'modules/reducer';
import { initGridCells,
  randomizeGridCells,
  stepGenerationAction } from 'modules/Game';
import App from 'components/App/App';

import type { rootState } from 'modules/reducer';
import type { Dispatch } from 'redux';

function mapStateToProps(state: rootState): Object {
  return {
    cells: getGridCells(state),
    generation: getGeneration(state),
    cellsAlive: getCellsAlive(state),
    cellsDead: getCellsDead(state),
    generationInMotion: getGenerationInMotion(state)
  };
}

function mapDispatchToProps(dispatch: Dispatch<*>): Object {
  return {
    initGridCells: bindActionCreators(initGridCells, dispatch),
    randomizeGridCells: bindActionCreators(randomizeGridCells, dispatch),
    stepGenerationAction: bindActionCreators(stepGenerationAction, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
