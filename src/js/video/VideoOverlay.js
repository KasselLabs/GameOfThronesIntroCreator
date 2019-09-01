import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connectContext from 'react-context-connector';

import { DefaultOpening } from '../animationData/defaultTexts.json';
import OpeningProvider from '../common/OpeningProvider';
import renderAnimationText from '../animationData/renderAnimationText';

class VideoOverlay extends Component {
  static propTypes = {
    configurations: PropTypes.object,
    opening: PropTypes.object,
    playing: PropTypes.bool,
    playStart: PropTypes.bool,
  };

  _renderTexts() {
    const { configurations, opening } = this.props;
    const textsDiv = [];
    for (let i = 0; i < DefaultOpening.length; i += 1) {
      const key = `text${i}`;
      const renderedText = renderAnimationText(opening.texts[key], i);
      textsDiv.push((
        <div key={key} id={key} style={configurations.texts[i]}>
          { renderedText }
        </div>
      ));
    }
    return textsDiv;
  }

  render() {
    const { configurations, playing, playStart } = this.props;
    const animate = playStart ? 'animate' : '';
    const pauseAnimation = playing ? '' : 'pause-animation';
    const classnames = `video-overlay ${animate} ${pauseAnimation}`;

    return (
      <div
        className={classnames}
        style={configurations.overlay}
      >
        <div
          className="video-overlay__content"
          style={configurations.overlay_content}
        >
          {this._renderTexts()}
        </div>
      </div>
    );
  }
}

const mapContextToProps = context => ({
  opening: context.opening,
});


export default connectContext(OpeningProvider, mapContextToProps)(VideoOverlay);
