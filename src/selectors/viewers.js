const NO_VIEWER = {};

export const getViewers = state => {
  const { viewers: { byIdentifier, identifiers } } = state;
  return identifiers.map(identifier => byIdentifier[identifier]);
};

export const getViewer = (state, identifier) => {
  const { viewers: { byIdentifier } } = state;
  return byIdentifier[identifier] || NO_VIEWER;
};

export const isLoadingViewers = state => {
  const { viewers: { isLoading } } = state;
  return isLoading;
};
