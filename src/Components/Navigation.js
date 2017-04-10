import React, { Component } from 'react';
import { Navigator } from 'react-native';
import ViewersList from './ViewersList';
import Viewer from './Viewer';

class Navigation extends Component {
  renderScene = (route, navigator) => {
    const { getViewer, viewers } = this.props;

    if (route.identifier == 'ViewersList') {
      return <ViewersList navigator={navigator} {...route.passProps} />;
    } else {
      return <Viewer navigator={navigator} identifier={route.identifier} />;
    }
  };

  render() {
    return (
      <Navigator
        style={{ flex: 1 }}
        initialRoute={{ identifier: 'ViewersList' }}
        renderScene={this.renderScene}
      />
    );
  }
}

export default Navigation;
