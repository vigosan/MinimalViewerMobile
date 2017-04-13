import { combineReducers } from 'redux';
import {
  FETCH_ENTRIES_REQUEST,
  FETCH_ENTRIES_SUCCESS,
  FETCH_ENTRIES_FAILURE
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
  isLoading
});
