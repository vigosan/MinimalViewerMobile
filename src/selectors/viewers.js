const NO_VIEWER = {};

export const getViewers = state => {
  const { viewers: { byId, ids } } = state;
  return ids.map(id => byId[id]);
};

export const getViewer = (state, identifier) => {
  const { viewers: { byId } } = state;
  return byId[identifier] || NO_VIEWER;
};

export const isLoadingViewers = state => {
  const { viewers: { isLoading } } = state;
  return isLoading;
};
