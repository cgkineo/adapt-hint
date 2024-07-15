import React from 'react';
import { classes, compile } from 'core/js/reactHelpers';

export default function Hint (props) {
  const {
    _globals,
    _hint
  } = props;

  const buttonAriaLabel = _hint._button.text
    ? null
    : _hint._button.ariaLabel
      ? _hint._button.ariaLabel
      : _globals._extensions._hint.openButtonText;

  return (
    <div className='hint__inner'>

      <button
        className={classes([
          'hint__btn',
          'js-hint-btn-popup',
          _hint._button._iconClass && 'btn-icon',
          _hint._button._alignIconRight && 'align-icon-right',
          _hint._button.text && 'btn-text'
        ])}
        aria-label={buttonAriaLabel}
      >

        {_hint._button._iconClass &&
        <span className='hint__btn-icon'>
          <span
            className={`icon ${_hint._button._iconClass}`}
            aria-hidden='true'
          ></span>
        </span>
        }

        {_hint._button.text &&
        <span className='hint__btn-text'>
          <span className='hint__btn-text-inner'>
            {compile(_hint._button.text)}
          </span>
        </span>
        }

      </button>

    </div>

  );
}
