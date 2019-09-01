import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../assets/img/logo-loading.png';

const LoadingLayer = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="loading-layer">
      <div className="logo">
        <img src={logo} alt="Loading spinner" />
      </div>
      <div className="circle" />
    </div>
  );
};

LoadingLayer.propTypes = {
  isLoading: PropTypes.bool,
};

export default LoadingLayer;
