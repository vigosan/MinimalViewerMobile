import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const configureStore = initialState => {
  let middlewares = [thunk];

  if (__DEV__) {
    middlewares = [...middlewares, logger];
  }

  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(...middlewares)
  );

  return store;
};

export default configureStore;
