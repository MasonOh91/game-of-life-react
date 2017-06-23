import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from 'modules/reducer';

export default function createStore() {
  const func = (window.devToolsExtension ? window.devToolsExtension()(_createStore) : _createStore);
  const create = compose(applyMiddleware(thunk))(func);

  const store = create(reducer);

  if (module.hot) {
        // Enable Webpack hot module replacement for reducers
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(reducer);
    });
  }

  return store;
}
