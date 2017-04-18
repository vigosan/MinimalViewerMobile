import { combineReducers } from 'redux';
import { REHYDRATE } from 'redux-persist/constants';
import {
  FETCH_ENTRIES_REQUEST,
  FETCH_ENTRIES_SUCCESS,
  FETCH_ENTRIES_FAILURE,
  MARK_ENTRY_AS_VIEWED
} from '../constants';

const byId = (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_ENTRIES_SUCCESS:
      return payload.entries;
    default:
      return state;
  }
};

const ids = (state = [], { type, payload }) => {
  switch (type) {
    case FETCH_ENTRIES_SUCCESS:
      return payload.entryIds;
    default:
      return state;
  }
};

const viewedIds = (state = [], { type, payload }) => {
  switch (type) {
    case REHYDRATE:
      const { entries = {} } = payload;
      const { viewedIds = [] } = entries;
      return viewedIds;
    case MARK_ENTRY_AS_VIEWED:
      return [...state, payload.id];
    default:
      return state;
  }
};

const isLoading = (state = false, { type }) => {
  switch (type) {
    case FETCH_ENTRIES_REQUEST:
      return true;
    case FETCH_ENTRIES_FAILURE:
    case FETCH_ENTRIES_SUCCESS:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  ids,
  isLoading,
  viewedIds
});
