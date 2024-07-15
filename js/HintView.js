import Adapt from 'core/js/adapt';
import React from 'react';
import ReactDOM from 'react-dom';
import { templates } from 'core/js/reactHelpers';
import notify from 'core/js/notify';

export default class HintView extends Backbone.View {

  className() {
    return 'hint';
  }

  initialize() {
    this.onHintPopupClicked = this.onHintPopupClicked.bind(this);
    this.listenTo(Adapt, 'remove', this.remove);
    this.setUpParentElement();
    this.render();
  }

  setUpParentElement() {
    this.$parentEl = $(`[data-adapt-id=${this.model.get('_id')}]`);
    this.$parentEl
      .on('click.js-hint-btn-popup', this.onHintPopupClicked)
      .addClass('has-hint');
  }

  get $targetElement() {
    // Check if the component has a header to determine where the hint element will be created
    const displayTitle = this.model.get('displayTitle');
    const body = this.model.get('body');
    const instruction = this.model.get('instruction');
    return (displayTitle || body || instruction)
      ? this.$parentEl.find('.component__header-inner')
      : this.$parentEl.find('.component__widget');
  }

  render() {
    const data = this.model.toJSON();
    ReactDOM.render(<templates.hint {...data} />, this.el);
    this.$targetElement.append(this.$el);
  }

  onHintPopupClicked() {
    notify.popup({
      ...this.model.get('_hint'),
      _classes: 'hint-popup'
    });
  }
}
