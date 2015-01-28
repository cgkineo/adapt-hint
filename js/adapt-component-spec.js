/*
* adapt-component-spec
* Version - 0.0.0
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
* Maintainers - Kirsty Hames <kirsty.hames@kineo.com>
*/
define(function(require) {

	var Adapt = require('coreJS/adapt');
	var Backbone = require('backbone');

	var ComponentSpecView = Backbone.View.extend({

		events: {
			"click .component-spec-show-detail-button":"onSpecButtonClicked"
		},
		
		className: 'component-spec',

		initialize: function() {
			this.render();
		},

		render: function() {
			var data = this.model.toJSON();
			var template = Handlebars.templates['component-spec'];
			this.$el.html(template(data)).appendTo($('.' + this.model.get('_id')));
			_.defer(_.bind(this.postRender, this));
		},

		postRender: function() {
			this.setLayout();
			this.listenTo(Adapt, 'remove', this.remove);
			this.listenTo(Adapt, 'component-spec-detail:open', this.checkIfShouldClose);
		},

		setLayout: function() {
			$('.' + this.model.get('_id')).css({
				position: 'relative'
			});
			$('.' + this.model.get('_id') + " .component-title-inner").css({
				paddingRight: '40px'
			});
			var $specDetail = this.$('.component-spec-detail');
			$specDetail.velocity({
				scaleX: 0,
				scaleY: 0
			}, {
				duration: 1
			});
		},

		onSpecButtonClicked: function(event) {
			if (event) event.preventDefault();
			var $specDetail = this.$('.component-spec-detail');
			if (!$specDetail.hasClass('detail-open')) {
				$specDetail.velocity({
					scaleX: 1,
					scaleY: 1
				}, {
					duration: 800,
					display: 'block',
					easing: [500, 35]
				});
				$specDetail.addClass('detail-open');
				this.$('.component-spec-show-detail-button').removeClass('icon-question').addClass('icon-cross');
				Adapt.trigger('component-spec-detail:open', this.model.get('_id'));
			} else {
				$specDetail.velocity({
					scaleX: 0,
					scaleY: 0
				}, {
					duration: 300,
					display: 'none'
				});
				$specDetail.removeClass('detail-open');
				this.$('.component-spec-show-detail-button').removeClass('icon-cross').addClass('icon-question');
			}
		},

		checkIfShouldClose: function(id) {
			if (this.model.get('_id') !== id) {
				var $detail = $('.' + this.model.get('_id') + " .component-spec-detail");
				var $button = $('.' + this.model.get('_id') + " .component-spec-show-detail-button");
				$detail.velocity({
					scaleX: 0,
					scaleY: 0
				}, {
					duration: 300,
					display: 'none'
				});
				$detail.removeClass('detail-open');
				$button.removeClass('icon-cross').addClass('icon-question');
			}
		}
	});

	Adapt.on('componentView:postRender', function(view) {
		if (view.model.get('_componentSpec')) {
			new ComponentSpecView({
				model: view.model
			});
		}
	});

});