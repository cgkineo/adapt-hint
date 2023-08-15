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

      const displayTitle = this.model.get('displayTitle');
      const body = this.model.get('body');
      const instruction = this.model.get('instruction');

      if (displayTitle || body || instruction) {
        this.$el.html(template(data)).appendTo($('.' + this.model.get('_id')).find('.component__header-inner'));
      } else {
        this.$el.html(template(data)).appendTo($('.' + this.model.get('_id')).find('.component__widget'));
      }

      _.defer(this.postRender.bind(this));
    },

    postRender: function() {
      this.$el.parents('.component').addClass('has-hint');
    },

    onHintPopupClicked: function() {
      Adapt.notify.popup({
        _view: new HintPopupView({ model: this.model }),
        _classes: 'hint-popup'
      });
    }

  });

  Adapt.on('componentView:postRender', function (view) {
    const hint = view.model.get('_hint');
    if (!hint || !hint._isEnabled) return;

    new HintView({
      model: view.model
    });
  });

});
