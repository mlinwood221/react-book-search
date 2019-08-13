import React, { FunctionComponent, SVGAttributes } from 'react';
import SvgButton from '../SvgButton';
import './style.scss';

type Props = {
  icon: SVGAttributes<SVGAElement>;
  title: string;
  onMenuClick: () => void;
};

const Toolbar: FunctionComponent<Props> = ({ children, icon, title, onMenuClick }) => (
  <nav className="toolbar">
    <div className="toolbar__icon">
      <SvgButton invertedColor icon={icon} onClick={onMenuClick} />
    </div>
    <h1 className="toolbar__title">{title}</h1>
    <div className="toolbar__actions">
      {React.Children.map(children, child => (
        <div className="toolbar__icon">{child}</div>
      ))}
    </div>
  </nav>
);

export default Toolbar;
