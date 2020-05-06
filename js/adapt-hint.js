define([
	'core/js/adapt'
], function (Adapt) {

	var hintView = Backbone.View.extend({

		events: {
			"click .js-hint-btn-toggle": "onHintClicked"
		},

		className: 'hint',

		initialize: function () {
			this.render();
		},

		render: function () {
			var data = this.model.toJSON();
			var template = Handlebars.templates['hint'];

			this.$el.html(template(data)).appendTo($('.' + this.model.get('_id')));
			_.defer(_.bind(this.postRender, this));
		},

		postRender: function () {
			this.setUpClassStates();
			this.listenTo(Adapt, 'remove', this.remove);
			this.listenTo(Adapt, 'js-hint-widget:open', this.checkIfShouldClose);
		},

		setUpClassStates: function () {
			this.$el.parents('.component').addClass('has-hint');

			this.$('.js-hint-btn-toggle').addClass('is-closed');
			this.$('.js-hint-widget').addClass('is-closed');
		},

		onHintClicked: function (event) {
			if (event) event.preventDefault();

			var $button = this.$('.js-hint-btn-toggle');
			var $widget = this.$('.js-hint-widget');

			var closeAria = Adapt.course.get('_globals')._extensions._hint.closeButtonText;
			var openAria = Adapt.course.get('_globals')._extensions._hint.openButtonText;

			if (!$widget.hasClass('is-open')) {
				$(event.currentTarget).attr({
					'aria-label': closeAria
				});

				$button.removeClass('is-closed').addClass('is-open');
				$widget.removeClass('is-closed').addClass('is-open');

				Adapt.trigger('popup:opened', this.$('.js-hint-inner'));
				$widget.a11y_focus();
				Adapt.trigger('js-hint-widget:open', this.model.get('_id'));
			} else {
				$(event.currentTarget).attr({
					'aria-label': openAria
				});

				$button.removeClass('is-open').addClass('is-closed');
				$widget.removeClass('is-open').addClass('is-closed');

				Adapt.trigger('popup:closed', this.$('.js-hint-inner'));
			}
		},

		checkIfShouldClose: function (id) {
			if (this.model.get('_id') !== id) {
				var $widget = $('.' + this.model.get('_id') + " .js-hint-widget");
				var $button = $('.' + this.model.get('_id') + " .js-hint-btn-toggle");

				$button.removeClass('is-open').addClass('is-closed');
				$widget.removeClass('is-open').addClass('is-closed');
			}
		}

	});

	Adapt.on('componentView:postRender', function (view) {
		if (view.model.has('_hint') && view.model.get('_hint').length > 0) {
			new hintView({
				model: view.model
			});
		}
	});

});
