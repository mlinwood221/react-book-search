/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import React from 'react';
import menuIcon from '@mdi/svg/svg/menu.svg';
import searchIcon from '@mdi/svg/svg/magnify.svg';
import Toolbar from './index';

storiesOf('Toolbar', module).add('default', () => (
  <Toolbar
    icon={
      <svg viewBox={menuIcon.viewBox} onClick={action('menuClick')}>
        <use xlinkHref={`#${menuIcon.id}`} />
      </svg>
    }
    title="Title"
  >
    <div onClick={action('action1')}>some action</div>
    <svg viewBox={searchIcon.viewBox} onClick={action('action2')}>
      <use xlinkHref={`#${searchIcon.id}`} />
    </svg>
  </Toolbar>
));
