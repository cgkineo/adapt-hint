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
      'click .js-hint-btn-popup': 'onHintPopupClicked'
    },

    className: 'hint',

    initialize: function() {
      this.listenTo(Adapt, 'remove', this.remove);
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
