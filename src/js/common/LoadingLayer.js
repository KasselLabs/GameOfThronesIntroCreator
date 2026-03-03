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
        <img src={logo} alt="Game of Thrones Intro Creator logo" width="500" height="221" />
      </div>
      <div className="circle" />
    </div>
  );
};

LoadingLayer.propTypes = {
  isLoading: PropTypes.bool,
};

export default LoadingLayer;
