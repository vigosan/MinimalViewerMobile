import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Content, List, ListItem, Text } from 'native-base';
import CustomHeader from './CustomHeader';
import Loading from './Loading';
import { fetchViewers } from '../actions';
import { getViewers, isLoadingViewers } from '../selectors';

class ViewersList extends Component {
  componentDidMount() {
    const { fetchViewers } = this.props;
    fetchViewers();
  }

  render() {
    if (this.props.isLoading) {
      return <Loading title="Minimal Viewer" />;
    }

    return (
      <View>
        <CustomHeader
          navigator={navigator}
          title={'Minimal Viewer'}
          withBackButton={false}
        />
        <List>
          {this._renderViewers()}
        </List>
      </View>
    );
  }

  _renderViewers() {
    const { viewers } = this.props;

    return viewers.map(
      function(viewer, index) {
        name = viewer.name;
        identifier = viewer.identifier;
        routerTrigger = this._navigate.bind(this, identifier);

        return (
          <ListItem onPress={routerTrigger} key={identifier}>
            <Text>{name}</Text>
          </ListItem>
        );
      }.bind(this)
    );
  }

  _navigate(identifier) {
    this.props.navigator.push({
      identifier: identifier
    });
  }
}

const { array, bool, func, object } = PropTypes;

ViewersList.propTypes = {
  fetchViewers: func.isRequired,
  isLoading: bool,
  navigator: object.isRequired,
  viewers: array.isRequired
};

const mapStateToProps = state => ({
  isLoading: isLoadingViewers(state),
  viewers: getViewers(state)
});

const mapDispatchToProps = {
  fetchViewers
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewersList);
