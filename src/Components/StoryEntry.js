import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    backgroundColor: 'white'
  }
});

class StoryEntry extends Component {
  render() {
    const {
      current,
      entry,
      index,
      relations,
      secondaryColor,
      total
    } = this.props;

    const title = entry[relations.Title];
    const subtitle = entry[relations.Subtitle];
    const link = entry[relations.Link];

    return (
      <View style={styles.card}>
        <View style={{ height: 350 }}>
          <Text style={{ fontSize: 24 }}>{title}</Text>
          <View
            style={{
              width: 200,
              height: 2,
              backgroundColor: 'black',
              marginTop: 25,
              marginBottom: 25
            }}
          />
          <Text style={{ fontSize: 14 }}>{subtitle}</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 220
          }}
        >
          <View
            style={{
              width: 250,
              height: 2,
              backgroundColor: 'black',
              marginBottom: 30
            }}
          />
          <Text style={{ fontSize: 32 }}>
            <Text style={{ color: current ? secondaryColor : 'black' }}>
              {index}
            </Text>
            /
            {total}
          </Text>
        </View>
      </View>
    );
  }
}

const { bool, object, number, string } = PropTypes;

StoryEntry.propTypes = {
  current: bool.isRequired,
  entry: object.isRequired,
  index: number.isRequired,
  relations: object.isRequired,
  secondaryColor: string.isRequired,
  total: number.isRequired
};

export default StoryEntry;
