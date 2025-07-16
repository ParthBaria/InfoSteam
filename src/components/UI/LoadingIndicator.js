import React from 'react';

import './LoadingIndicator.css';

const LoadingIndicator = ({ style }) => (
  <div className="lds-ring" style={style}>
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default LoadingIndicator;
