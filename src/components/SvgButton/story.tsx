/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import React from 'react';
import favoriteIcon from '@mdi/svg/svg/heart.svg';
import SvgButton from './index';

storiesOf('SvgButton', module)
  .add('with text', () => (
    <SvgButton onClick={action('click')} icon={favoriteIcon} text="The text" />
  ))
  .add('without text', () => <SvgButton onClick={action('click')} icon={favoriteIcon} />);
