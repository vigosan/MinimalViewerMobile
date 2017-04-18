import { compose, applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import createFilter from 'redux-persist-transform-filter';
import { AsyncStorage } from 'react-native';
import reducers from '../reducers';

const configureStore = initialState => {
  let middlewares = [thunk];

  if (__DEV__) {
    middlewares = [...middlewares, logger];
  }

  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middlewares), autoRehydrate())
  );

  const persistViewedIds = createFilter('entries', ['viewedIds']);

  persistStore(store, {
    storage: AsyncStorage,
    transform: [persistViewedIds]
  });

  return store;
};

export default configureStore;
