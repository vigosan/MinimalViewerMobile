import { combineReducers } from 'redux';
import {
  FETCH_VIEWERS_REQUEST,
  FETCH_VIEWERS_SUCCESS,
  FETCH_VIEWERS_FAILURE
} from '../constants';

export const byIdentifier = (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_VIEWERS_SUCCESS:
      return payload.viewers;
    default:
      return state;
  }
};

export const identifiers = (state = [], { type, payload }) => {
  switch (type) {
    case FETCH_VIEWERS_SUCCESS:
      return payload.viewerIdentifiers;
    default:
      return state;
  }
};

export const isLoading = (state = false, { type }) => {
  switch (type) {
    case FETCH_VIEWERS_REQUEST:
      return true;
    case FETCH_VIEWERS_FAILURE:
    case FETCH_VIEWERS_SUCCESS:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  byIdentifier,
  identifiers,
  isLoading
});
