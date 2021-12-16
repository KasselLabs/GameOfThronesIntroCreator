import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const DONATION_AMOUNTS = {
  watermark: 15,
  'no-watermark': 25,
};

export default function DonationOptions({ updatePaymentAmount }) {
  const [selectedOption, setSelectedOption] = useState('no-watermark');

  const selectOption = useCallback((option) => {
    setSelectedOption(option);
    updatePaymentAmount(DONATION_AMOUNTS[option]);
  });

  return (
    <div className="donation-options">
      <button
        type="button"
        className={classnames('option', {
          '-selected': 'watermark' === selectedOption,
        })}
        onClick={() => selectOption('watermark')}
      >
        <span className="title">Standard</span>
        <span className="description">Full HD Quality</span>
        <span className="description">MP4 Video</span>
        <span className="description">Video will be like in the preview</span>
        <span className="description">
          Donate at least
          {' '}
          <b>$15</b>
        </span>
      </button>
      <button
        type="button"
        className={classnames('option', {
          '-selected': 'no-watermark' === selectedOption,
        })}
        onClick={() => selectOption('no-watermark')}
      >
        <span className="title">No Watermark</span>
        <span className="description">Full HD Quality</span>
        <span className="description">MP4 Video</span>
        <span className="description">Video will be like in the preview</span>
        <span className="description">but without the watermark</span>
        <span className="description">
          Donate at least
          {' '}
          <b>$25</b>
        </span>
      </button>
    </div>
  );
}

DonationOptions.propTypes = {
  updatePaymentAmount: PropTypes.func.isRequired,
};
