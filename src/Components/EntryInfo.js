import React from 'react';
import { Text, View } from 'react-native';

class EntryInfo extends React.Component {
  shouldComponentUpdate() {
    return this.props.total === 0;
  }

  render() {
    const { current, index, total, secondaryColor } = this.props;
    return (
      <Text style={{ fontSize: 32 }}>
        <Text style={{ color: current ? secondaryColor : 'black' }}>
          {index}
        </Text>
        /
        {total}
      </Text>
    );
  }
}

export default EntryInfo;
