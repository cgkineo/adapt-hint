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

        this.render();
    }

    render() {
        const data = this.model.toJSON();
        
        //Check if the component has a header to determine where the hint element will be created
        const displayTitle = this.model.get('displayTitle');
        const body = this.model.get('body');
        const instruction = this.model.get('instruction');

        const containsHeader = displayTitle || body || instruction;
        const componentHeaderInner = $('.' + this.model.get('_id')).find('.component__header-inner');
        const componentWidget = $('.' + this.model.get('_id')).find('.component__widget');
        const targetSelector = containsHeader ? componentHeaderInner  : componentWidget;        

        let hintElement = document.createElement("div");
        hintElement.classList.add(this.className());

        ReactDOM.render(<templates.hint {...data} />, hintElement);

        targetSelector.append(hintElement);

        $('.' + this.model.get('_id')).on('click.js-hint-btn-popup', this.onHintPopupClicked);

        _.defer(this.postRender.bind(this));
    }

    postRender() {
        $('.' + this.model.get('_id')).addClass('has-hint');
    }

    onHintPopupClicked() {
        notify.popup({
            ...this.model.get('_hint'),
            _classes: 'hint-popup'
        });
    }
}
  