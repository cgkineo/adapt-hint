import React from 'react';
import { classes } from 'core/js/reactHelpers';

export default function Hint (props) {
  const {
    _globals,
    _hint
  } = props;

  return (
    <div className={classes(["hint__inner"])}>

    <button className={classes([
              'hint__btn',
              'js-hint-btn-popup',
              (_hint._button._iconClass) && 'btn-icon',
              (_hint._button.alignIconRight) && 'align-icon-right',
              (_hint._button.text) && 'btn-text'
            ])}
            aria-label={classes([
              (_hint._button.ariaLabel) ? _hint._button.ariaLabel : _globals._extensions._hint.openButtonText
            ])}
    >
    
    {_hint._button._iconClass &&
      <span className={classes([
        "hint__btn-icon"
      ])}>
        <span className={classes([
                `icon ${_hint._button._iconClass}`
              ])}
              aria-label={classes([
                "true"
              ])}
        ></span>
      </span>
    }

    {_hint._button.text &&
    <span className={classes([
      "hint__btn-text"
    ])}>
      <span className={classes([
        "hint__btn-text-inner"
      ])}>
      {_hint._button.text}
      </span>
    </span>
    }

  </button>

</div>

  );
}
