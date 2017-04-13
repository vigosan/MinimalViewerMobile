import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, AsyncStorage } from 'react-native';
import Loading from './Loading';
import NoEntries from './NoEntries';
import CustomHeader from './CustomHeader';
import SlideShow from './SlideShow';
import { fetchEntries } from '../actions';
import { getEntriesByViewer, getViewer, isLoadingEntries } from '../selectors';

class Viewer extends Component {
  componentDidMount() {
    const { fetchEntries, viewer } = this.props;

    if (viewer) {
      fetchEntries(viewer);
    }
  }

  render() {
    const {
      entries,
      isLoading,
      viewer: { name },
      viewer,
      navigator
    } = this.props;
    const noEntriesLeft = entries.length === 0;

    if (isLoading) {
      return <Loading title={name} />;
    }

    if (noEntriesLeft) {
      return <NoEntries title={name} navigator={navigator} />;
    }

    return (
      <View>
        <CustomHeader navigator={navigator} title={name} withBackButton />
        <SlideShow entries={entries} {...viewer} />
      </View>
    );
  }
}

const { array, bool, object } = PropTypes;

Viewer.propTypes = {
  entries: array.isRequired,
  isLoading: bool,
  navigator: object.isRequired,
  viewer: object.isRequired
};

const mapStateToProps = (state, { identifier }) => ({
  entries: getEntriesByViewer(state, identifier),
  isLoading: isLoadingEntries(state),
  viewer: getViewer(state, identifier)
});

const mapDispatchToProps = {
  fetchEntries
};

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
