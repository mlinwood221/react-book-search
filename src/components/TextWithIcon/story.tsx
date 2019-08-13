/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import React from 'react';
import favoriteIcon from '@mdi/svg/svg/heart.svg';
import TextWithIcon from './index';

storiesOf('TextWithIcon', module).add('default', () => (
  <TextWithIcon icon={favoriteIcon} text="The text" />
));
