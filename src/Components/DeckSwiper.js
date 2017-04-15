import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  View
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  }
});

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const SWIPE_OUT_DURATION = 250;

class DeckSwiper extends Component {
  constructor(props) {
    super(props);
    this.state = { index: 0 };
  }

  componentWillMount() {
    this._position = new Animated.ValueXY();
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource !== this.props.dataSource) {
      this.setState({ index: 0 });
    }
  }

  _handleStartShouldSetPanResponder = () => {
    return true;
  };

  _handlePanResponderMove = (event, { dx, dy }) => {
    this._position.setValue({ x: dx, y: dy });
  };

  _handlePanResponderEnd = (event, { dx, dy }) => {
    if (Math.abs(dx) <= 5 && Math.abs(dy) <= 5) {
      const { dataSource, onClick } = this.props;
      const { index } = this.state;
      const item = dataSource[index];
      onClick(item);
      return;
    }

    if (dx > SWIPE_THRESHOLD) {
      this._forceSwipe('right');
    } else if (dx < -SWIPE_THRESHOLD) {
      this._forceSwipe('left');
    } else {
      this._resetPosition();
    }
  };

  _forceSwipe(direction) {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this._position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => this._onSwipeComplete(direction));
  }

  _resetPosition() {
    Animated.spring(this._position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  _onSwipeComplete(direction) {
    const { dataSource, onSwipeLeft, onSwipeRight } = this.props;
    const { index } = this.state;
    const item = dataSource[index];
    const callback = direction === 'right'
      ? onSwipeRight(item)
      : onSwipeLeft(item);

    this._position.setValue({ x: 0, y: 0 });
    this.setState(prevState => {
      return { index: prevState.index + 1 };
    }, callback);
  }

  _getCardStyle() {
    const position = this._position;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-30deg', '0deg', '30deg']
    });
    const opacity = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: [0.5, 1, 0.5]
    });

    return {
      ...position.getLayout(),
      opacity,
      transform: [{ rotate }]
    };
  }

  _renderCards = () => {
    const { dataSource, renderItem } = this.props;
    const { index } = this.state;

    return dataSource
      .map((item, i) => {
        if (i < index) {
          return null;
        }

        if (i === index) {
          return (
            <Animated.View
              key={item.url}
              style={[this._getCardStyle()]}
              {...this._panResponder.panHandlers}
            >
              {renderItem(item, i)}
            </Animated.View>
          );
        }

        return (
          <Animated.View key={item.url}>
            {renderItem(item, i)}
          </Animated.View>
        );
      })
      .reverse();
  };

  render() {
    return (
      <View style={styles.container}>
        {this._renderCards()}
      </View>
    );
  }
}

DeckSwiper.defaultProps = {
  onClick: () => {},
  onSwipeLeft: () => {},
  onSwipeRight: () => {}
};

export default DeckSwiper;
