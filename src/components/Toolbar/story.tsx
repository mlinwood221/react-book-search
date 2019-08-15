/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import React from 'react';
import menuIcon from '@mdi/svg/svg/menu.svg';
import searchIcon from '@mdi/svg/svg/magnify.svg';
import Toolbar from './index';
import SvgButton from '../SvgButton';

storiesOf('Toolbar', module)
  .add('default', () => (
    <Toolbar icon={menuIcon} title="Title" onMenuClick={action('onMenuClick')} />
  ))
  .add('one action', () => (
    <Toolbar icon={menuIcon} title="Title" onMenuClick={action('onMenuClick')}>
      <SvgButton invertedColor icon={searchIcon} onClick={action('action click')} />
    </Toolbar>
  ))
  .add('multiple actions', () => (
    <Toolbar icon={menuIcon} title="Title" onMenuClick={action('onMenuClick')}>
      <SvgButton invertedColor icon={searchIcon} onClick={action('action click')} />
      <div onClick={action('other action click')}>text action</div>
    </Toolbar>
  ));
