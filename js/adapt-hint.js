define([
  'core/js/adapt'
], function (Adapt) {

  const HintPopupView = Backbone.View.extend({

    className: 'hint-popup',

    initialize: function() {
      this.render();
    },

    render: function() {
      const data = this.model.toJSON();
      data.view = this;
      const template = Handlebars.templates.hintPopup;
      this.$el.html(template(data));
    }

  });

  const HintView = Backbone.View.extend({

    events: {
      'click .js-hint-btn-toggle': 'onHintToggleClicked',
      'click .js-hint-btn-popup': 'onHintPopupClicked'
    },

    className: 'hint',

    initialize: function() {
      this.listenTo(Adapt, 'remove', this.remove);

      if (!this.model.get('_hint')._isNotifyPopup) {
        this.listenTo(Adapt, 'hint:opened', this.checkIfShouldClose);
      }

      this.render();
    },

    render: function() {
      const data = this.model.toJSON();
      const template = Handlebars.templates.hint;

      this.$el.html(template(data)).appendTo($('.' + this.model.get('_id')));

      _.defer(this.postRender.bind(this));
    },

    postRender: function() {
      this.$el.parents('.component').addClass('has-hint');
    },

    onHintPopupClicked: function() {
      Adapt.notify.popup({
        _view: new HintPopupView({ model: this.model }),
        _isCancellable: true,
        _showCloseButton: true,
        _closeOnBackdrop: true
      });
    },

    onHintToggleClicked: function (e) {
      const $button = this.$('.js-hint-btn-toggle');
      const $widget = this.$('.js-hint-widget');
      const globals = Adapt.course.get('_globals')._extensions._hint;
      const isBeingOpened = $widget.hasClass('is-closed');

      $widget
        .toggleClass('is-open', isBeingOpened)
        .toggleClass('is-closed', !isBeingOpened);
      $button
        .toggleClass('is-open', isBeingOpened)
        .toggleClass('is-closed', !isBeingOpened)
        .attr('aria-label', (isBeingOpened ? globals.closeButtonText : globals.openButtonText));

      if (isBeingOpened) {
        Adapt.a11y.popupOpened($widget);
        Adapt.trigger('hint:opened', this.model.get('_id'));
        return;
      }

      Adapt.a11y.popupClosed($button);
    },

    /**
     * Handles closing the hint pop-out if another hint was opened
     * @param {string} id The component id of the hint that triggered this event
     */
    checkIfShouldClose: function (id) {
      if (this.model.get('_id') === id) return;

      if (this.$('.js-hint-btn-toggle').hasClass('is-closed')) return;

      this.onHintToggleClicked();
    }

  });

  Adapt.on('componentView:postRender', function (view) {
    if (view.model.has('_hint') && view.model.get('_hint')._items.length > 0) {
      new HintView({
        model: view.model
      });
    }
  });

});
