import React from 'react';
import { classes, compile } from 'core/js/reactHelpers';

export default function Hint (props) {
  const {
    _globals,
    _hint
  } = props;

  const hintButton = _hint._button;
  const buttonAriaLabel = hintButton.text
    ? null
    : hintButton.ariaLabel
      ? hintButton.ariaLabel
      : _globals._extensions._hint.openButtonText;

  return (
    <div className='hint__inner'>

      <button
        className={classes([
          'hint__btn',
          'js-hint-btn-popup',
          hintButton._iconClass && 'btn-icon',
          hintButton._alignIconRight && 'align-icon-right',
          hintButton.text && 'btn-text',
          hintButton._classes
        ])}
        aria-label={buttonAriaLabel}
      >

        {hintButton._iconClass &&
        <span className='hint__btn-icon'>
          <span
            className={`icon ${hintButton._iconClass}`}
            aria-hidden='true'
          ></span>
        </span>
        }

        {hintButton.text &&
        <span className='hint__btn-text'>
          <span className='hint__btn-text-inner'>
            {compile(hintButton.text)}
          </span>
        </span>
        }

      </button>

    </div>

  );
}
