import { normalize, schema } from 'normalizr';
import {
  FETCH_ENTRIES_FAILURE,
  FETCH_ENTRIES_REQUEST,
  FETCH_ENTRIES_SUCCESS
} from '../constants';
import slugify from '../Utils/slugify';

export const fetchEntriesFailure = () => ({
  type: FETCH_ENTRIES_FAILURE
});

export const fetchEntriesRequest = () => ({
  type: FETCH_ENTRIES_REQUEST
});

export const fetchEntriesSuccess = (viewer, data) => ({
  type: FETCH_ENTRIES_SUCCESS,
  payload: data,
  viewer
});

export const fetchEntries = viewer => dispatch => {
  dispatch(fetchEntriesRequest());

  const parseJson = response => {
    return response.json();
  };

  const normalizeJson = data => {
    const entrySchema = new schema.Entity(
      'entries',
      {},
      {
        processStrategy: (entry, parent, key) => {
          return {
            ...entry,
            viewer: viewer.identifier
          };
        },
        idAttribute: entry =>
          `@MinimalViewer:${viewer.identifier}:${entry[viewer.relations.ElementKey]}`
      }
    );

    const entryListSchema = new schema.Array(entrySchema);
    return normalize(data.headlines || data, entryListSchema);
  };

  const present = ({ entities: { entries = {} }, result: entryIds }) => ({
    entries,
    entryIds
  });

  fetch(viewer.url)
    .then(parseJson)
    .then(normalizeJson)
    .then(present)
    .then(data => dispatch(fetchEntriesSuccess(viewer, data)))
    .catch(error => dispatch(fetchEntriesFailure()))
    .done();
};
