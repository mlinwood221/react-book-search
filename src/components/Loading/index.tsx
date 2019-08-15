import React from 'react';
import loadingIcon from '@mdi/svg/svg/loading.svg';

import './style.scss';

const Loading = () => (
  <div className="loading">
    <svg viewBox={loadingIcon.viewBox} className="loading__icon">
      <use xlinkHref={`#${loadingIcon.id}`} />
    </svg>
    <p className="loading__message">Loading...</p>
  </div>
);

export default Loading;
