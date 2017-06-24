/* @flow */
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getGridSize, getGridCells } from 'modules/reducer';
import { setGridSize, initGridCells, randomizeGridCells } from 'modules/Game';
import App from 'components/App/App';

import type { rootState } from 'modules/reducer';
import type { Dispatch } from 'redux';

function mapStateToProps(state: rootState): Object {
  return {
    cellsPerRow: getGridSize(state),
    cells: getGridCells(state)
  };
}

function mapDispatchToProps(dispatch: Dispatch<*>): Object {
  return {
    setGridSize: bindActionCreators(setGridSize, dispatch),
    initGridCells: bindActionCreators(initGridCells, dispatch),
    randomizeGridCells: bindActionCreators(randomizeGridCells, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
