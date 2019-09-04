import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import connectContext from 'react-context-connector';
import isEqual from 'lodash.isequal';

import Swal from './extras/swal';
import OpeningProvider from './common/OpeningProvider';

import { DefaultOpening } from './animationData/defaultTexts.json';
import firebaseOpeningEncode from './api/firebaseOpeningEncode';

class OpeningForm extends Component {
  static propTypes = {
    opening: PropTypes.object,
    openingKey: PropTypes.string,
    playNewOpening: PropTypes.func,

    history: PropTypes.object,

    showDownloadButton: PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.inputsRefs = {};

    const { opening } = props;

    if (opening) {
      this.state = {
        opening,
      };
      return;
    }

    const defaultOpening = {
      texts: DefaultOpening,
    };

    const defaultOpeningEncoded = firebaseOpeningEncode(defaultOpening);

    this.state = {
      opening: defaultOpeningEncoded,
    };
  }

  _goToDownloadPage = () => {
    const { openingKey, history } = this.props;
    history.push(`/${openingKey}/download`);
  }

  _download = async () => {
    const { openingKey, playNewOpening, history } = this.props;
    const { opening: openingBefore } = this.state;

    const formValues = this._getFormValues();

    const openingFromForm = {
      texts: formValues,
    };

    const openingNow = firebaseOpeningEncode(openingFromForm);

    const isOpeningEqual = isEqual(openingBefore, openingNow);

    if (isOpeningEqual) {
      this._goToDownloadPage();
      return;
    }

    const alertResult = await Swal({
      titleText: 'TEXT WAS MODIFIED',
      showCancelButton: true,
      cancelButtonText: 'PLAY IT',
      cancelButtonAriaLabel: 'PLAY IT',
      confirmButtonText: 'RESTORE MY INTRO',
      confirmButtonAriaLabel: 'RESTORE MY INTRO',
      allowOutsideClick: false,
      text: 'You have changed some of the text fields. You need to play the new intro to save and request a download. Do you want to restore your intro text or play the new one?',
    });

    if (alertResult.value) {
      // refresh page form
      history.push('/');
      history.push(`/${openingKey}/edit`);
      return;
    }

    if (this._isValidOpening(openingFromForm)) {
      playNewOpening(openingNow, history);
    }
  }

  _isValidOpening = (opening) => {
    const { texts } = opening;

    const isAllTextsValid = texts.every((text, index) => {
      const maxLength = 26 === index ? 50 : 150;
      return text.length <= maxLength;
    });

    if (!isAllTextsValid) {
      Swal('OOPS...', 'All text fields should be less than 150 characters and the logo should be less than 50. ;)', 'warning');
      return false;
    }

    return true;
  };

  _textAreaInput = (id, value, rows, maxLength, ref, first) => (
    <textarea
      ref={ref}
      key={id}
      name={id}
      id={id}
      rows={rows}
      spellCheck={false}
      maxLength={maxLength}
      defaultValue={value}
      autoFocus={first}
    />
  );

  _renderInputs() {
    const inputsCount = DefaultOpening.length;
    const inputs = [];
    const { texts } = this.state.opening;

    for (let i = 0; i < inputsCount; i += 1) {
      const ref = React.createRef();
      const id = `input-text${i}`;
      const isLogoText = 26 === i;
      const rows = isLogoText ? 1 : 2;
      const maxLength = isLogoText ? 50 : 150;
      const first = 0 === i;
      const input = this._textAreaInput(id, texts[`text${i}`], rows, maxLength, ref, first);

      this.inputsRefs[i] = ref;
      inputs.push(input);
    }

    return inputs;
  }

  _getFormValues() {
    const keys = Object.keys(this.inputsRefs);
    const values = keys.map(key => this.inputsRefs[key].current.value);
    return values;
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    const values = this._getFormValues();
    const { playNewOpening, history } = this.props;

    const opening = {
      texts: values,
    };

    if (this._isValidOpening(opening)) {
      const encodedOpening = firebaseOpeningEncode(opening);
      playNewOpening(encodedOpening, history);
    }
  }

  render() {
    const { showDownloadButton } = this.props;
    return (
      <div id="opening-form">
        <div className="info-box">Fill the inputs below, the order is left to right, top to bottom</div>
        <form onSubmit={this._handleSubmit}>
          <div className="form-inputs">
            {this._renderInputs()}
          </div>
          <div className="buttons">
            <button type="submit" className="button big">Play</button>
            { showDownloadButton &&
              <button type="button" onClick={this._download} className="button big">Download</button>
            }
          </div>
        </form>
      </div>
    );
  }
}

const mapContextToProps = context => ({
  opening: context.opening,
  openingKey: context.key,
  playNewOpening: context.playNewOpening,
});

export default withRouter(connectContext(OpeningProvider, mapContextToProps)(OpeningForm));
