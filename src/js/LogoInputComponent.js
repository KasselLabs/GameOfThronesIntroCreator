/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import connectContext from 'react-context-connector';
import { withRouter } from 'react-router';

import { renderLogoText } from './animationData/renderAnimationText';
import { DefaultOpening } from './animationData/defaultTexts.json';
import OpeningProvider from './common/OpeningProvider';

import {
  LOGO_INDEX,
  MAX_LOGO_CHARACTERS,
} from './api/config';

const getStateFromProps = (nextProps, prevState) => {
  const { opening } = nextProps;
  const { loadedText } = prevState;
  const receiveText = (opening && opening.texts.text26) || DefaultOpening[26];

  if (receiveText !== loadedText) {
    return {
      logoText: receiveText,
      loadedText: receiveText,
    };
  }

  return null;
};

class LogoInputComponent extends Component {
  static propTypes = {
    opening: PropTypes.object,
    inputRef: PropTypes.object,
  }

  constructor(props) {
    super(props);

    const { inputRef, opening } = props;

    this.inputRef = inputRef;
    this.ref = React.createRef();

    const loadedText = opening ? opening.texts.text26 : DefaultOpening[26];

    this.state = {
      hoverOn: false,
      focusOn: false,
      loadedText,
      logoText: loadedText,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getStateFromProps(nextProps, prevState);
  }

  _onLogoTextChange = (event) => {
    const { value } = event.target;
    this.setState({ logoText: value });
  }

  _onFocusInput = () => {
    this.setState({ focusOn: true });
  }

  _onBlurInput = () => {
    this.setState({ focusOn: false });
  }

  _onMouseEnterInput = () => {
    this.setState({ hoverOn: true });
  }

  _onMouseLeaveInput = () => {
    this.setState({ hoverOn: false });
  }

  _onClickPreview = () => {
    this.inputRef.current.focus();
  }

  render() {
    const maxPreviewWidth = 500;
    const windowWidth = window.innerWidth - 20;
    const maxWidth = windowWidth > maxPreviewWidth ? maxPreviewWidth : windowWidth;
    const baseConfig = {
      width: 1448,
      fontSize: 37,
    };
    const ratio = maxWidth / baseConfig.width;
    const logoStyleConfiguration = {
      minWidth: baseConfig.width * ratio,
      fontSize: baseConfig.fontSize * ratio,
    };

    const { inputRef } = this.props;
    const { logoText, hoverOn, focusOn } = this.state;
    const id = `input-text${LOGO_INDEX}`;

    const classNames = `${hoverOn ? 'hover' : ''} ${focusOn ? 'focus' : ''}`;

    return (
      <div className="form-inputs logo-form">
        <div>
          <textarea
            ref={inputRef}
            key={id}
            name={id}
            id={id}
            rows={2}
            spellCheck={false}
            maxLength={MAX_LOGO_CHARACTERS}
            defaultValue={logoText}
            onChange={this._onLogoTextChange}
            onFocus={this._onFocusInput}
            onBlur={this._onBlurInput}
            onMouseEnter={this._onMouseEnterInput}
            onMouseLeave={this._onMouseLeaveInput}
            className={classNames}
            data-tip="Try also uppercase letters, it will show bigger in the logo."
            data-for="input-logo"
            data-event="focus"
            data-event-off="blur"
          />
        </div>
        <span className="right-arrow">&rarr;</span>
        <div
          role="textbox"
          style={logoStyleConfiguration}
          className={`logo-preview-text ${classNames}`}
          onFocus={this._onFocusInput}
          onBlur={this._onBlurInput}
          onMouseEnter={this._onMouseEnterInput}
          onMouseLeave={this._onMouseLeaveInput}
          onClick={this._onClickPreview}
          onKeyPress={this._onClickPreview}
          data-tip="This is a preview of how the logo will be placed in the video"
          data-for="preview-logo"
        >
          {renderLogoText(this.state.logoText)}
        </div>
        <ReactTooltip
          id="input-logo"
          effect="solid"
          delayHide={250}
          className="logo-preview-tooltip"
        />
        <ReactTooltip
          id="preview-logo"
          effect="solid"
          delayHide={250}
          className="logo-preview-tooltip"
        />
      </div>
    );
  }
}

const mapContextToProps = context => ({
  opening: context.opening,
});

export default withRouter(connectContext(OpeningProvider, mapContextToProps)(LogoInputComponent));
