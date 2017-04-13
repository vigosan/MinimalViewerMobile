import { combineReducers } from 'redux';
import {
  FETCH_ENTRIES_SUCCESS,
  FETCH_VIEWERS_FAILURE,
  FETCH_VIEWERS_REQUEST,
  FETCH_VIEWERS_SUCCESS
} from '../constants';

const byId = (state = {}, { type, payload, viewer }) => {
  switch (type) {
    case FETCH_VIEWERS_SUCCESS:
      return payload.viewers;
    case FETCH_ENTRIES_SUCCESS:
      const viewerInState = state[viewer.identifier];
      return {
        ...state,
        [viewer.identifier]: { ...viewerInState, entryIds: payload.entryIds }
      };
    default:
      return state;
  }
};

const ids = (state = [], { type, payload }) => {
  switch (type) {
    case FETCH_VIEWERS_SUCCESS:
      return payload.viewerIds;
    default:
      return state;
  }
};

const isLoading = (state = false, { type }) => {
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
  byId,
  ids,
  isLoading
});
