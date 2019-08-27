import React, { Component } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import { BUFFERING, PAUSED } from './constants';
import { START_AT, youtubeVideoId, TIME_FACTOR } from '../api/config';

class YoutubePlayer extends Component {
  propTypes = {
    onStateChange: PropTypes.func,
  }

  constructor() {
    super();

    this.youtubePlayer = React.createRef();
  }

  play = () => {
    this.youtubePlayer.current.internalPlayer.playVideo();
    this.youtubePlayer.current.internalPlayer.setPlaybackRate(1 / TIME_FACTOR);
  }

  _checkState = (state) => {
    const isBuffering = YouTube.PlayerState.BUFFERING === state;
    if (isBuffering) {
      return BUFFERING;
    }

    const isPaused = YouTube.PlayerState.PAUSED === state;
    if (isPaused) {
      return PAUSED;
    }

    return state;
  }

  _onStateChange = (event) => {
    const state = event.data;

    const parsedState = this._checkState(state);

    this.props.onStateChange(parsedState);
  }

  render() {
    const opts = {
      width: '100%',
      height: '100%',
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        enablejsapi: 1,
        fs: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        start: START_AT,
      },
    };

    const { onStateChange, ...props } = this.props;

    return (
      <YouTube
        className="youtube-player"
        videoId={youtubeVideoId}
        opts={opts}
        onStateChange={this._onStateChange}
        {...props}
        ref={this.youtubePlayer}
      />
    );
  }
}

export default YoutubePlayer;
