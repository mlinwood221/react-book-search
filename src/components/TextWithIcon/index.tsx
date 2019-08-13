import React, { FunctionComponent, SVGAttributes } from 'react';
import './style.scss';

type Props = {
  icon: SVGAttributes<SVGAElement>;
  text: string;
};

const TextWithIcon: FunctionComponent<Props> = ({
  icon,
  text,
  ...additionalProps
}: Props) => (
  <div {...additionalProps} className="text-with-icon">
    <svg viewBox={icon.viewBox} className="text-with-icon__icon">
      <use xlinkHref={`#${icon.id}`} />
    </svg>
    <span>{text}</span>
  </div>
);

export default TextWithIcon;
