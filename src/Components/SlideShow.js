import React, { Component } from 'react';
import { Linking, View } from 'react-native';
import DeckSwiper from './DeckSwiper';
import HeadlineEntry from './HeadlineEntry';
import StoryEntry from './StoryEntry';

class SlideShow extends Component {
  constructor(props) {
    super(props);
    this.state = { current: 0, total: 0 };
  }

  componentDidMount() {
    const { entries } = this.props;
    this.setState({ total: entries.length });
  }

  _handleClick = ({ url }) => {
    Linking.openURL(url);
  };

  _handleSwipe = () => {
    const total = this.props.entries.length;
    this.setState(prevState => {
      const current = prevState.current + 1;
      return { current: current > total ? 0 : current };
    });
  };

  _renderItem = (item, index) => {
    const { current, total } = this.state;
    const Entry = this.props.type === 'headline' ? HeadlineEntry : StoryEntry;

    return (
      <Entry
        key={item.url}
        index={index + 1}
        current={current === index}
        entry={item}
        relations={this.props.relations}
        secondaryColor={this.props.secondary_color}
        total={total}
      />
    );
  };

  render() {
    const { entries } = this.props;

    return (
      <View>
        <DeckSwiper
          dataSource={entries}
          onClick={this._handleClick}
          onSwipeLeft={this._handleSwipe}
          onSwipeRight={this._handleSwipe}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

export default SlideShow;
