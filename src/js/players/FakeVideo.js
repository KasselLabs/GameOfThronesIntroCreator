import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TIME_FACTOR, VIDEO_START_AT, VIDEO_END_AT } from '../api/config';

class FakeVideo extends Component {
  static propTypes = {
    onPlay: PropTypes.func,
    onReady: PropTypes.func,
    onEnd: PropTypes.func,
  }

  componentDidMount() {
    this._setupFakePlayer();
  }

  shouldComponentUpdate() {
    return false;
  }

  _playCallback = () => {
    this.props.onPlay();
    if (window.introStartCallback) {
      window.introStartCallback();
    }
  }

  _endCallback = () => {
    this.props.onEnd();
    if (window.introEndedCallback) {
      window.introEndedCallback();
    }
  }

  _setupFakePlayer() {
    window.playApp = () => {
      this._playCallback();

      setTimeout(() => {
        this._endCallback();
      }, (VIDEO_END_AT - VIDEO_START_AT) * TIME_FACTOR * 1000);
    };

    this.props.onReady();
  }

  play() {
    // just to not call undefined function.
  }

  render() {
    return (
      <div className="fake-video" />
    );
  }
}

export default FakeVideo;
