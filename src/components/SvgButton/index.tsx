import React, { FunctionComponent, SVGAttributes } from 'react';
import './style.scss';

type Props = {
  icon: SVGAttributes<SVGAElement>;
  onClick?: () => void;
  text?: string;
  invertedColor?: boolean;
};

const SvgButton: FunctionComponent<Props> = ({
  icon,
  text,
  invertedColor,
  onClick,
  ...additionalProps
}: Props) => (
  <button
    onClick={onClick}
    className={`svg-button ${invertedColor ? 'svg-button--inverted-color' : ''}`}
    {...additionalProps}
  >
    <svg viewBox={icon.viewBox} className="svg-button__icon">
      <use xlinkHref={`#${icon.id}`} />
    </svg>
    {text}
  </button>
);

export default SvgButton;
