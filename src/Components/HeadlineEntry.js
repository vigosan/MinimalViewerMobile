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

class HeadlineEntry extends Component {
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
    const link = entry[relations.Link];
    const subtitle = entry[relations.Subtitle];

    return (
      <View style={styles.card}>
        <View style={{ justifyContent: 'center', height: 300, padding: 40 }}>
          <Text style={{ textAlign: 'center', fontSize: 32 }}>{title}</Text>
        </View>
        <View style={{ justifyContent: 'center', height: 100 }}>
          <Text style={{ textAlign: 'center', fontSize: 24 }}>
            {subtitle}
          </Text>
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

HeadlineEntry.propTypes = {
  current: bool.isRequired,
  entry: object.isRequired,
  index: number.isRequired,
  relations: object.isRequired,
  secondaryColor: string.isRequired,
  total: number.isRequired
};

export default HeadlineEntry;
