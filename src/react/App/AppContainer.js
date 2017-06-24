/* @flow */
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getGridSize, getGridCells } from 'modules/reducer';
import { setGridSize } from 'modules/Game';
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
    setGridSize: bindActionCreators(setGridSize, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
