import { normalize, schema } from 'normalizr';
import {
  FETCH_VIEWERS_FAILURE,
  FETCH_VIEWERS_REQUEST,
  FETCH_VIEWERS_SUCCESS
} from '../constants';

const API_URL =
  'https://6zlh88pn7f.execute-api.us-west-2.amazonaws.com/production/viewers';

export const fetchViewersFailure = () => ({
  type: FETCH_VIEWERS_FAILURE
});

export const fetchViewersRequest = () => ({
  type: FETCH_VIEWERS_REQUEST
});

export const fetchViewersSuccess = data => ({
  type: FETCH_VIEWERS_SUCCESS,
  payload: data
});

export const fetchViewers = () => dispatch => {
  dispatch(fetchViewersRequest());

  const parseJson = response => {
    return response.json();
  };

  const normalizeJson = data => {
    const viewerSchema = new schema.Entity(
      'viewers',
      {},
      {
        processStrategy: (viewer, parent, key) => {
          return {
            ...viewer,
            entryIds: []
          };
        },
        idAttribute: 'identifier'
      }
    );
    const viewerListSchema = new schema.Array(viewerSchema);
    return normalize(data, viewerListSchema);
  };

  const present = ({ entities: { viewers = {} }, result: viewerIds }) => ({
    viewers,
    viewerIds
  });

  fetch(API_URL)
    .then(parseJson)
    .then(normalizeJson)
    .then(present)
    .then(data => dispatch(fetchViewersSuccess(data)))
    .catch(error => dispatch(fetchViewersFailure()))
    .done();
};
