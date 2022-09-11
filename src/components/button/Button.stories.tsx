// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button, ButtonType } from './Button';

storiesOf('Button1', module)
  .add('Button111', () => (
    <Button onClick={action('clicked')} btnType={ButtonType.Primary}>
      Hello Button
    </Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role='img' aria-label='so cool'>
        😀 😎 👍 💯
      </span>
    </Button>
  ));
