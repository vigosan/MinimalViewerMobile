import React, { Component, Children } from 'react';
import { DeckSwiper } from 'native-base';
import HeadlineEntry from './HeadlineEntry';
import StoryEntry from './StoryEntry';

class SlideShow extends Component {
  constructor(props) {
    super(props);
    this.state = { current: 1, total: 0 };
  }

  componentDidMount() {
    const { entries } = this.props;
    this.setState({ total: entries.length });
  }

  _handleSwipe = () => {
    const total = this.props.entries.length;
    this.setState(prevState => {
      const current = prevState.current + 1;
      return { current: current > total ? 1 : current };
    });
  };

  render() {
    const { entries } = this.props;
    const { current, total } = this.state;

    return (
      <DeckSwiper
        dataSource={entries}
        renderItem={entry => {
          const Entry = this.props.type === 'headline'
            ? HeadlineEntry
            : StoryEntry;
          return (
            <Entry
              entry={entry}
              relations={this.props.relations}
              total={total}
              currentPosition={current}
              secondaryColor={this.props.secondary_color}
            />
          );
        }}
        onSwipeRight={this._handleSwipe}
        onSwipeLeft={this._handleSwipe}
      />
    );
  }
}

export default SlideShow;
