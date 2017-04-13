const NO_ENTRIES = [];

export const getEntriesByViewer = (state, identifier) => {
  if (!identifier) {
    return NO_ENTRIES;
  }
  const {
    viewers: { byId: viewersById },
    entries: { byId: entriesById }
  } = state;
  const { entryIds } = viewersById[identifier];
  return entryIds.map(entryId => entriesById[entryId]);
};

export const isLoadingEntries = state => {
  const { entries: { isLoading } } = state;
  return isLoading;
};
