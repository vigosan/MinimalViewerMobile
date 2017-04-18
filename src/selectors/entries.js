const NO_ENTRIES = [];

export const getEntriesByViewer = (state, identifier) => {
  if (!identifier) {
    return NO_ENTRIES;
  }

  const {
    viewers: { byId: viewersById },
    entries: { byId: entriesById, viewedIds: entriesViewedIds }
  } = state;
  const { entryIds } = viewersById[identifier];
  const notViewedEntryIds = entryIds.filter(entryId => {
    return !entriesViewedIds.includes(entryId);
  });
  return notViewedEntryIds.map(entryId => entriesById[entryId]);
};

export const isLoadingEntries = state => {
  const { entries: { isLoading } } = state;
  return isLoading;
};
