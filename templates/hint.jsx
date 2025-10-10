import React from 'react';
import { classes, compile } from 'core/js/reactHelpers';

export default function Hint (props) {
  const {
    _globals,
    _hint
  } = props;

  const button = _hint._button;
  const buttonAriaLabel = button.text
    ? null
    : button.ariaLabel
      ? button.ariaLabel
      : _globals._extensions._hint.openButtonText;

  return (
    <div className='hint__inner'>

      <button
        className={classes([
          'hint__btn',
          'js-hint-btn-popup',
          button._iconClass && 'btn-icon',
          button._alignIconRight && 'align-icon-right',
          button.text && 'btn-text',
          button._classes
        ])}
        aria-label={buttonAriaLabel}
      >

        {button._iconClass &&
        <span className='hint__btn-icon'>
          <span
            className={`icon ${button._iconClass}`}
            aria-hidden='true'
          ></span>
        </span>
        }

        {button.text &&
        <span className='hint__btn-text'>
          <span className='hint__btn-text-inner'>
            {compile(button.text)}
          </span>
        </span>
        }

      </button>

    </div>

  );
}
