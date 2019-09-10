/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { renderLogoText } from './animationData/renderAnimationText';
import { DefaultOpening } from './animationData/defaultTexts.json';

import {
  LOGO_INDEX,
  MAX_LOGO_CHARACTERS,
} from './api/config';

class LogoInputComponent extends Component {
  constructor(props) {
    super(props);

    const { opening, inputRef } = props;

    this.inputRef = inputRef;

    if (opening) {
      this.state = {
        logoText: opening.texts.text26,
      };
      return;
    }

    this.state = {
      logoText: DefaultOpening[26],
      hoverOn: false,
      focusOn: false,
    };
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
      width: baseConfig.width * ratio,
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
        >
          {renderLogoText(this.state.logoText)}
        </div>
      </div>
    );
  }
}

LogoInputComponent.propTypes = {
  opening: PropTypes.object,
  inputRef: PropTypes.object,
};

export default LogoInputComponent;
