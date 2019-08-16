import React from 'react';
import icon from '@mdi/svg/svg/alert-octagram.svg';
import './style.scss';

type Props = {
  message: string;
};

const ErrorMessage = ({ message }: Props) => (
  <div className="error-message">
    <svg viewBox={icon.viewBox} className="error-message__icon">
      <use xlinkHref={`#${icon.id}`} />
    </svg>
    <p className="error-message__message">{message}</p>
  </div>
);

export default ErrorMessage;
